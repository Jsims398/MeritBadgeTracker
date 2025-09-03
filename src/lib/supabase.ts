import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Scout {
  id: string;
  name: string;
  troop: string | null;
  age: number | null;
  email: string | null;
  created_at: string;
}

export interface MeritBadge {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  created_at: string;
}

export interface Requirement {
  id: string;
  merit_badge_id: string;
  requirement_number: number;
  description: string;
  created_at: string;
}

export interface ScoutProgress {
  id: string;
  scout_id: string;
  requirement_id: string;
  completed: boolean;
  completed_date: string | null;
  notes: string | null;
  counselor_name: string | null;
  created_at: string;
}
