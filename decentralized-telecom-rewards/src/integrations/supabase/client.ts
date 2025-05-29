
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kuhqrtizwzmkwsuzmssb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aHFydGl6d3pta3dzdXptc3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzYyOTUsImV4cCI6MjA1NjM1MjI5NX0.EVY1j5C5QHNaFPGvncfiV693jDQ4GnCzMeaSBWWvX5A";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
