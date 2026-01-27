/**
 * NPS API Client
 *
 * Provides typed access to the National Park Service API.
 * API Documentation: https://www.nps.gov/subjects/developer/api-documentation.htm
 */

const NPS_API_BASE = "https://developer.nps.gov/api/v1";

// =============================================================================
// Types
// =============================================================================

export interface NPSAlert {
  id: string;
  title: string;
  description: string;
  category: "Danger" | "Park Closure" | "Caution" | "Information";
  url: string;
  parkCode: string;
  lastIndexedDate: string;
}

export interface NPSCampground {
  id: string;
  name: string;
  description: string;
  parkCode: string;
  reservationUrl: string;
  reservationInfo: string;
  regulationsOverview: string;
  totalSites: string;
  campsites: {
    totalSites: string;
    group: string;
    horse: string;
    tentOnly: string;
    electricalHookups: string;
    rvOnly: string;
    walkBoatTo: string;
    other: string;
  };
  amenities: {
    trashRecyclingCollection: string;
    toilets: string[];
    internetConnectivity: string;
    showers: string[];
    cellPhoneReception: string;
    laundry: string;
    amphitheater: string;
    dumpStation: string;
    campStore: string;
    staffOrVolunteerHostOnsite: string;
    potableWater: string[];
    iceAvailableForSale: string;
    firewoodForSale: string;
    foodStorageLockers: string;
  };
  accessibility: {
    wheelchairAccess: string;
    internetInfo: string;
    rvAllowed: string;
    rvMaxLength: string;
    trailerMaxLength: string;
    trailerAllowed: string;
    accessRoads: string[];
    classifications: string[];
  };
  fees: Array<{
    cost: string;
    description: string;
    title: string;
  }>;
  images: Array<{
    url: string;
    altText: string;
    caption: string;
  }>;
  operatingHours: Array<{
    description: string;
    standardHours: Record<string, string>;
  }>;
  latLong: string;
  directionsOverview: string;
}

export interface NPSEvent {
  id: string;
  title: string;
  description: string;
  parkCode: string;
  dateStart: string;
  dateEnd: string;
  dates: string[];
  times: Array<{
    timeStart: string;
    timeEnd: string;
  }>;
  location: string;
  types: string[];
  category: string;
  tags: string[];
  regresUrl: string;
  regresInfo: string;
  contactName: string;
  contactTelephoneNumber: string;
  contactEmailAddress: string;
  feeInfo: string;
  isRegresRequired: string;
  images: Array<{
    url: string;
    altText: string;
    caption: string;
  }>;
}

interface NPSApiResponse<T> {
  total: string;
  limit: string;
  start: string;
  data: T[];
}

// =============================================================================
// API Client Class
// =============================================================================

export class NPSClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T[]> {
    const url = new URL(`${NPS_API_BASE}${endpoint}`);
    url.searchParams.set("api_key", this.apiKey);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.error(`NPS API error: ${response.status} ${response.statusText}`);
        return [];
      }

      const data: NPSApiResponse<T> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("NPS API fetch error:", error);
      return [];
    }
  }

  /**
   * Get active alerts for a park
   */
  async getAlerts(parkCode: string): Promise<NPSAlert[]> {
    return this.fetch<NPSAlert>("/alerts", {
      parkCode,
      limit: "50",
    });
  }

  /**
   * Get campgrounds for a park
   */
  async getCampgrounds(parkCode: string): Promise<NPSCampground[]> {
    return this.fetch<NPSCampground>("/campgrounds", {
      parkCode,
      limit: "50",
    });
  }

  /**
   * Get upcoming events for a park
   */
  async getEvents(parkCode: string): Promise<NPSEvent[]> {
    // Get events starting from today
    const today = new Date().toISOString().split("T")[0];

    return this.fetch<NPSEvent>("/events", {
      parkCode,
      dateStart: today,
      limit: "20",
    });
  }
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Extract NPS park code from NPS URL
 * e.g., "https://www.nps.gov/yell/" -> "yell"
 */
export function extractNPSCode(npsUrl: string | null): string | null {
  if (!npsUrl) return null;

  // Match pattern: nps.gov/CODE/ or nps.gov/CODE
  const match = npsUrl.match(/nps\.gov\/([a-z]{4})\/?/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Get alert severity level for sorting/styling
 */
export function getAlertSeverity(category: NPSAlert["category"]): number {
  const severityMap: Record<NPSAlert["category"], number> = {
    Danger: 4,
    "Park Closure": 3,
    Caution: 2,
    Information: 1,
  };
  return severityMap[category] || 0;
}

/**
 * Get color classes for alert category
 */
export function getAlertColors(category: NPSAlert["category"]): { bg: string; text: string } {
  const colorMap: Record<NPSAlert["category"], { bg: string; text: string }> = {
    Danger: { bg: "bg-red-600", text: "text-white" },
    "Park Closure": { bg: "bg-orange-500", text: "text-white" },
    Caution: { bg: "bg-yellow-400", text: "text-gray-900" },
    Information: { bg: "bg-blue-500", text: "text-white" },
  };
  return colorMap[category] || { bg: "bg-gray-500", text: "text-white" };
}

/**
 * Filter and sort events to show only upcoming ones
 */
export function getUpcomingEvents(events: NPSEvent[], limit = 5): NPSEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events
    .filter((event) => {
      const startDate = new Date(event.dateStart);
      return startDate >= today;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateStart);
      const dateB = new Date(b.dateStart);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, limit);
}

/**
 * Format campground fee for display
 */
export function formatCampgroundFee(fees: NPSCampground["fees"]): string {
  if (!fees || fees.length === 0) return "Free";

  const mainFee = fees[0];
  const cost = parseFloat(mainFee.cost);

  if (cost === 0) return "Free";
  return `$${cost.toFixed(0)}`;
}

/**
 * Get primary amenities for campground display
 */
export function getCampgroundAmenities(amenities: NPSCampground["amenities"]): string[] {
  const result: string[] = [];

  if (amenities.toilets?.some((t) => t.toLowerCase().includes("flush"))) {
    result.push("Restrooms");
  }
  if (amenities.showers?.some((s) => s.toLowerCase() !== "none")) {
    result.push("Showers");
  }
  if (amenities.potableWater?.some((w) => w.toLowerCase() !== "no water")) {
    result.push("Water");
  }
  if (amenities.dumpStation === "Yes") {
    result.push("Dump Station");
  }
  if (amenities.campStore === "Yes") {
    result.push("Camp Store");
  }
  if (amenities.laundry === "Yes") {
    result.push("Laundry");
  }

  return result.slice(0, 4); // Limit to 4 amenities for display
}
