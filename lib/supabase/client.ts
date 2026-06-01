import { createBrowserClient } from "@supabase/ssr";
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createBrowserClient<Database>(
  supabaseUrl!,
  supabaseKey!,
);

export const createClient = () => supabase;
