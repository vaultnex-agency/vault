// Untyped Supabase client for admin operations
// This bypasses strict TypeScript generics that cause false positives
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseAdmin = createClient<any>(supabaseUrl, supabaseAnonKey)

// Named alias so admin pages can import { supabase } from '@/lib/supabase/admin'
export const supabase = supabaseAdmin
