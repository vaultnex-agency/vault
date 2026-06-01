-- VAULTNEX Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SITE SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
('hero', '{"headline": "Building Future-Ready\nDigital Experiences", "subheadline": "Websites, branding, and digital systems crafted to help businesses grow online.", "cta_primary": "Get Your Website Now", "cta_secondary": "View Work"}'),
('about', '{"content": "VAULTNEX is a creative digital agency helping ambitious brands establish a strong online presence through strategy, branding, design, and development."}'),
('seo', '{"title": "VAULTNEX — Premium Digital Agency", "description": "Building Future-Ready Digital Experiences. Websites, branding, and digital systems crafted to help businesses grow online.", "og_image": "/og-image.jpg"}'),
('contact', '{"whatsapp": ["8113824528", "8714422242", "7306613586"], "phone": ["8113824528", "8714422242", "7306613586"], "email": "vaultnex01@gmail.com"}')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- SERVICES
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO services (category, title, description, sort_order) VALUES
('Website Services', 'Landing Pages', 'High-converting landing pages built for results', 1),
('Website Services', 'Business Websites', 'Professional websites that represent your brand', 2),
('Website Services', 'Portfolio Websites', 'Elegant portfolios for creatives and professionals', 3),
('Website Services', 'E-commerce Websites', 'Online stores that drive sales and growth', 4),
('Branding Services', 'Logo Design', 'Timeless logos that define your identity', 5),
('Branding Services', 'Brand Identity', 'Complete visual systems for modern brands', 6),
('Branding Services', 'Social Media Branding', 'Cohesive social presence across all platforms', 7),
('Branding Services', 'Business Cards', 'Premium print materials that make impressions', 8),
('Growth Services', 'Website Redesign', 'Transform outdated sites into modern experiences', 9),
('Growth Services', 'Basic SEO Setup', 'Foundation for organic search visibility', 10),
('Growth Services', 'UI/UX Design', 'User-centered design for digital products', 11);

-- ============================================
-- PORTFOLIO PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  problem TEXT,
  solution TEXT,
  result TEXT,
  tools TEXT[] DEFAULT '{}',
  cover_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO portfolio_projects (slug, title, category, problem, solution, result, tools, is_featured, sort_order) VALUES
('decoratio-wedding-decor', 'Decoratio Wedding Decor', 'Website & Branding', 'No professional website and weak online identity.', 'Created a modern website and cohesive branding system.', 'Improved visual identity and stronger brand perception.', ARRAY['HTML', 'CSS', 'Figma', 'Canva'], TRUE, 1),
('bloom-botanicals', 'Bloom Botanicals', 'E-commerce & Branding', 'Outdated online store with poor user experience.', 'Redesigned the store with a clean, conversion-focused layout.', 'Increased online inquiries by 40% within the first month.', ARRAY['Next.js', 'Figma', 'Supabase'], TRUE, 2),
('artisan-coffee-co', 'Artisan Coffee Co.', 'Website & Identity', 'No digital presence for a growing local coffee brand.', 'Built a premium website with full brand identity system.', 'Established strong online presence and brand recognition.', ARRAY['HTML', 'CSS', 'Figma'], TRUE, 3);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO testimonials (client_name, client_role, client_company, content, sort_order) VALUES
('Ananya Sharma', 'Founder', 'Decoratio Events', 'Professional design and smooth communication. The team understood our vision perfectly and delivered beyond our expectations.', 1),
('Rahul Menon', 'CEO', 'Bloom Botanicals', 'VAULTNEX transformed our online presence completely. Our customers love the new website and we have seen a significant increase in inquiries.', 2),
('Priya Nair', 'Owner', 'Artisan Coffee Co.', 'From concept to launch, the process was seamless. The brand identity they created is timeless and truly represents who we are.', 3);

-- ============================================
-- PRICING PACKAGES
-- ============================================
CREATE TABLE IF NOT EXISTS pricing_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  cta_text TEXT DEFAULT 'Get Started',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

INSERT INTO pricing_packages (name, price, description, features, is_featured, cta_text, sort_order) VALUES
('Starter Website', '₹4,999+', 'Perfect for individuals and small businesses getting started online', ARRAY['Up to 5 pages', 'Mobile responsive design', 'Basic SEO setup', 'Contact form', 'Social media links', '1 revision round', 'Delivery in 7–10 days'], FALSE, 'Get Started', 1),
('Business Website', '₹14,999+', 'Comprehensive solution for growing businesses ready to scale', ARRAY['Up to 15 pages', 'Custom design & development', 'Advanced SEO setup', 'Blog integration', 'Analytics setup', 'WhatsApp chat integration', '3 revision rounds', 'Delivery in 14–21 days', 'Post-launch support'], TRUE, 'Most Popular', 2),
('Premium Branding + Website', 'Custom Quote', 'Full-service creative package for ambitious brands', ARRAY['Full brand identity system', 'Custom website design', 'Logo & visual identity', 'Social media branding kit', 'Business card design', 'Unlimited revisions', 'Priority delivery', '30-day post-launch support'], FALSE, 'Get a Quote', 3);

-- ============================================
-- TEAM MEMBERS
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

INSERT INTO team_members (name, role, bio, sort_order) VALUES
('Arjun V.', 'Founder & Creative Director', 'Passionate about crafting digital experiences that leave a lasting impression.', 1),
('Meera K.', 'Lead Designer', 'Turning complex ideas into elegant, intuitive visual systems.', 2),
('Dev R.', 'Web Developer', 'Building fast, accessible, and beautiful websites from the ground up.', 3);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author TEXT DEFAULT 'VAULTNEX Team',
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTACT LEADS
-- ============================================
CREATE TABLE IF NOT EXISTS contact_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- new, read, replied, archived
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MEDIA UPLOADS
-- ============================================
CREATE TABLE IF NOT EXISTS media_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_uploads ENABLE ROW LEVEL SECURITY;

-- Public read policies (for site content)
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read active projects" ON portfolio_projects FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read active pricing" ON pricing_packages FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read active team" ON team_members FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read published posts" ON blog_posts FOR SELECT USING (is_published = TRUE);

-- Public insert for contact form
CREATE POLICY "Anyone can submit contact form" ON contact_leads FOR INSERT WITH CHECK (TRUE);

-- Authenticated (admin) full access
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access portfolio" ON portfolio_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access pricing" ON pricing_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access team" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read leads" ON contact_leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update leads" ON contact_leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access media" ON media_uploads FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKET
-- ============================================
-- Run this after creating the bucket in the Supabase dashboard
-- INSERT INTO storage.buckets (id, name, public) VALUES ('vaultnex-media', 'vaultnex-media', TRUE);
