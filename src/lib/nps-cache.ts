/**
 * NPS API Caching Layer
 *
 * Uses Cloudflare KV to cache NPS API responses with appropriate TTLs.
 *
 * Cache TTLs by endpoint:
 * - Alerts: 15 minutes (safety-critical, needs freshness)
 * - Events: 2 hours (changes occasionally)
 * - Campgrounds: 4 hours (mostly static data)
 */

type NPSDataType = "alerts" | "events" | "campgrounds";

// Cache TTLs in seconds
const CACHE_TTL: Record<NPSDataType, number> = {
  alerts: 15 * 60, // 15 minutes
  events: 2 * 60 * 60, // 2 hours
  campgrounds: 4 * 60 * 60, // 4 hours
};

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  expiresAt: number;
}

/**
 * Generate cache key for NPS data
 */
function getCacheKey(dataType: NPSDataType, parkCode: string): string {
  return `nps:${dataType}:${parkCode.toLowerCase()}`;
}

/**
 * Get cached NPS data or fetch fresh data if expired/missing
 */
export async function getCachedNPSData<T>(
  kv: KVNamespace | undefined,
  dataType: NPSDataType,
  parkCode: string,
  fetcher: () => Promise<T>
): Promise<T> {
  // If no KV namespace available, just fetch directly
  if (!kv) {
    console.warn("NPS_CACHE KV namespace not available, fetching directly");
    return fetcher();
  }

  // If no park code, return empty result type-safely
  if (!parkCode) {
    return [] as unknown as T;
  }

  const cacheKey = getCacheKey(dataType, parkCode);
  const ttl = CACHE_TTL[dataType];

  try {
    // Try to get from cache
    const cached = await kv.get<CacheEntry<T>>(cacheKey, "json");

    if (cached && cached.expiresAt > Date.now()) {
      // Cache hit - return cached data
      return cached.data;
    }

    // Cache miss or expired - fetch fresh data
    const freshData = await fetcher();

    // Store in cache
    const entry: CacheEntry<T> = {
      data: freshData,
      cachedAt: Date.now(),
      expiresAt: Date.now() + ttl * 1000,
    };

    // Use KV's built-in TTL for automatic cleanup
    await kv.put(cacheKey, JSON.stringify(entry), {
      expirationTtl: ttl,
    });

    return freshData;
  } catch (error) {
    console.error(`Cache error for ${cacheKey}:`, error);

    // On cache error, try to fetch directly
    try {
      return fetcher();
    } catch (fetchError) {
      console.error(`Fetch error for ${cacheKey}:`, fetchError);
      // Return empty array as fallback for graceful degradation
      return [] as unknown as T;
    }
  }
}

/**
 * Invalidate cached data for a specific park and data type
 */
export async function invalidateNPSCache(
  kv: KVNamespace | undefined,
  dataType: NPSDataType,
  parkCode: string
): Promise<void> {
  if (!kv || !parkCode) return;

  const cacheKey = getCacheKey(dataType, parkCode);

  try {
    await kv.delete(cacheKey);
  } catch (error) {
    console.error(`Failed to invalidate cache for ${cacheKey}:`, error);
  }
}

/**
 * Invalidate all cached data for a park
 */
export async function invalidateAllParkCache(
  kv: KVNamespace | undefined,
  parkCode: string
): Promise<void> {
  if (!kv || !parkCode) return;

  const dataTypes: NPSDataType[] = ["alerts", "events", "campgrounds"];

  await Promise.all(dataTypes.map((type) => invalidateNPSCache(kv, type, parkCode)));
}

/**
 * Check if data is stale (past TTL but still usable)
 * Useful for showing cached data while refreshing in background
 */
export function isDataStale<T>(entry: CacheEntry<T> | null): boolean {
  if (!entry) return true;
  return entry.expiresAt < Date.now();
}

/**
 * Get cache stats for debugging/monitoring
 */
export async function getCacheStats(
  kv: KVNamespace | undefined,
  parkCode: string
): Promise<Record<NPSDataType, { cached: boolean; age: number | null }>> {
  const stats: Record<NPSDataType, { cached: boolean; age: number | null }> = {
    alerts: { cached: false, age: null },
    events: { cached: false, age: null },
    campgrounds: { cached: false, age: null },
  };

  if (!kv || !parkCode) return stats;

  const dataTypes: NPSDataType[] = ["alerts", "events", "campgrounds"];

  await Promise.all(
    dataTypes.map(async (type) => {
      const cacheKey = getCacheKey(type, parkCode);
      try {
        const entry = await kv.get<CacheEntry<unknown>>(cacheKey, "json");
        if (entry) {
          stats[type] = {
            cached: true,
            age: Math.floor((Date.now() - entry.cachedAt) / 1000),
          };
        }
      } catch {
        // Ignore errors for stats
      }
    })
  );

  return stats;
}
