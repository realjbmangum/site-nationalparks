/**
 * Printful API Client with KV caching
 */

const PRINTFUL_API_BASE = 'https://api.printful.com';

export interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
}

export interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    type: string;
    url: string;
    preview_url: string;
  }>;
}

export class PrintfulClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${PRINTFUL_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Printful API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data.result;
  }

  async getSyncProducts(): Promise<PrintfulSyncProduct[]> {
    return this.fetch<PrintfulSyncProduct[]>('/store/products');
  }

  async getSyncProduct(id: number): Promise<{
    sync_product: PrintfulSyncProduct;
    sync_variants: PrintfulSyncVariant[];
  }> {
    return this.fetch(`/store/products/${id}`);
  }
}

/**
 * Get cached Printful data from KV, falling back to API
 */
export async function getCachedPrintfulData<T>(
  kv: KVNamespace,
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 3600
): Promise<T> {
  const cacheKey = `printful:${key}`;
  const cached = await kv.get(cacheKey);
  if (cached) {
    return JSON.parse(cached) as T;
  }

  const data = await fetcher();
  await kv.put(cacheKey, JSON.stringify(data), { expirationTtl: ttlSeconds });
  return data;
}
