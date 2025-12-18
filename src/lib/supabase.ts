import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have real credentials
const hasRealCredentials = supabaseUrl !== 'https://placeholder.supabase.co';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Types for parks_locations table
export interface ParkLocation {
  id: string;
  name: string;
  slug: string;
  state: string;
  states?: string[]; // Some parks span multiple states
  region: string;
  latitude: number;
  longitude: number;
  established: string;
  size_acres: number;
  annual_visitors: number;
  entrance_fee: number;
  reservation_required: boolean;
  best_seasons: string[];
  difficulty: 'family' | 'moderate' | 'challenging' | 'expert';
  description: string;
  ai_description?: string;
  things_to_do: string[];
  top_hikes?: object[];
  wildlife: string[];
  weather_notes?: string;
  insider_tips?: string[];
  nearest_airports?: string[];
  gateway_cities?: string[];
  photo_url?: string;
  features: {
    camping?: boolean;
    lodging?: boolean;
    rv_facilities?: boolean;
    wheelchair_accessible?: boolean;
    dog_friendly?: boolean;
  };
  created_at: string;
  updated_at?: string;
}

export interface ParkSubmission {
  id: string;
  park_name: string;
  contact_name: string;
  contact_email: string;
  suggestion_type: 'correction' | 'tip' | 'photo' | 'other';
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
}

// Query functions
export async function getAllParks(): Promise<ParkLocation[]> {
  const { data, error } = await supabase
    .from('parks_locations')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching parks:', error);
    return [];
  }
  return data || [];
}

export async function getParkBySlug(slug: string): Promise<ParkLocation | null> {
  const { data, error } = await supabase
    .from('parks_locations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching park:', error);
    return null;
  }
  return data;
}

export async function getParksByState(state: string): Promise<ParkLocation[]> {
  const { data, error } = await supabase
    .from('parks_locations')
    .select('*')
    .eq('state', state)
    .order('name');

  if (error) {
    console.error('Error fetching parks by state:', error);
    return [];
  }
  return data || [];
}

export async function getParksByRegion(region: string): Promise<ParkLocation[]> {
  const { data, error } = await supabase
    .from('parks_locations')
    .select('*')
    .eq('region', region)
    .order('name');

  if (error) {
    console.error('Error fetching parks by region:', error);
    return [];
  }
  return data || [];
}

export async function getFeaturedParks(limit: number = 6): Promise<ParkLocation[]> {
  const { data, error } = await supabase
    .from('parks_locations')
    .select('*')
    .order('annual_visitors', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured parks:', error);
    return [];
  }
  return data || [];
}

export async function searchParks(query: string): Promise<ParkLocation[]> {
  const { data, error } = await supabase
    .from('parks_locations')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(10);

  if (error) {
    console.error('Error searching parks:', error);
    return [];
  }
  return data || [];
}
