import { createServerClient as createSSRClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Standard SSR client handling auth cookies
export async function createClient() {
  const cookieStore = await cookies()
  
  return createSSRClient<Database>(
    supabaseUrl!,
    supabaseAnonKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

// Keep the old function names for backwards compatibility during transition
export const createServerAnonClient = createClient;

// Service role client bypassing RLS
export function createServerRoleClient() {
  return createSSRClient<Database>(
    supabaseUrl!,
    supabaseServiceKey || supabaseAnonKey!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      }
    }
  )
}

export const createServerClient = createServerRoleClient;
