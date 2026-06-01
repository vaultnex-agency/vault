// Database types for VAULTNEX
// These are manually typed; replace with `supabase gen types typescript` after linking your project

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          category: string
          title: string
          description: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          title: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          title?: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      portfolio_projects: {
        Row: {
          id: string
          slug: string
          title: string
          category: string | null
          problem: string | null
          solution: string | null
          result: string | null
          tools: string[]
          cover_image: string | null
          gallery_images: string[]
          is_featured: boolean
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          category?: string | null
          problem?: string | null
          solution?: string | null
          result?: string | null
          tools?: string[]
          cover_image?: string | null
          gallery_images?: string[]
          is_featured?: boolean
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['portfolio_projects']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_role: string | null
          client_company: string | null
          content: string
          rating: number
          avatar_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_role?: string | null
          client_company?: string | null
          content: string
          rating?: number
          avatar_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      pricing_packages: {
        Row: {
          id: string
          name: string
          price: string
          description: string | null
          features: string[]
          is_featured: boolean
          cta_text: string
          sort_order: number
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          price: string
          description?: string | null
          features?: string[]
          is_featured?: boolean
          cta_text?: string
          sort_order?: number
          is_active?: boolean
        }
        Update: Partial<Database['public']['Tables']['pricing_packages']['Insert']>
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          avatar_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          is_active: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          avatar_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          is_active?: boolean
          sort_order?: number
        }
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string | null
          cover_image: string | null
          author: string
          tags: string[]
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content?: string | null
          cover_image?: string | null
          author?: string
          tags?: string[]
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      contact_leads: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          service: string | null
          message: string | null
          status: string
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          service?: string | null
          message?: string | null
          status?: string
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          status?: string
        }
      }
      media_uploads: {
        Row: {
          id: string
          filename: string
          storage_path: string
          public_url: string
          mime_type: string | null
          size_bytes: number | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          storage_path: string
          public_url: string
          mime_type?: string | null
          size_bytes?: number | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['media_uploads']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
