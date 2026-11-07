-- =========================================================================
-- PREPRESUME DATABASE SCHEMA (PostgreSQL on NeonDB / Cloudflare Hyperdrive)
-- Specification Version: 3.0
-- Architecture: Next.js Full Stack + NeonDB PostgreSQL + R2 Storage
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth0_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'super_admin')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending_deletion')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. AUTH IDENTITIES (Google OAuth & WhatsApp OTP)
CREATE TABLE IF NOT EXISTS auth_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('google', 'whatsapp')),
    provider_id VARCHAR(255) NOT NULL,
    verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_id)
);

-- 3. WHATSAPP OTP SESSIONS
CREATE TABLE IF NOT EXISTS whatsapp_otp_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) NOT NULL,
    otp_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    attempts INT DEFAULT 0,
    resend_count INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MASTER CAREER PROFILES
CREATE TABLE IF NOT EXISTS master_career_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_matching_consent BOOLEAN DEFAULT FALSE,
    job_matching_consent_updated_at TIMESTAMPTZ,
    target_roles TEXT[],
    target_industries TEXT[],
    preferred_locations TEXT[],
    personal_info JSONB DEFAULT '{}'::jsonb,
    experiences JSONB DEFAULT '[]'::jsonb,
    educations JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb,
    certifications JSONB DEFAULT '[]'::jsonb,
    achievements JSONB DEFAULT '[]'::jsonb,
    languages JSONB DEFAULT '[]'::jsonb,
    custom_sections JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESUMES
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    target_role VARCHAR(255),
    selected_template_id VARCHAR(100) NOT NULL,
    customization JSONB NOT NULL DEFAULT '{}'::jsonb,
    content JSONB NOT NULL,
    section_order TEXT[],
    visible_sections JSONB DEFAULT '{}'::jsonb,
    ats_score INT,
    last_analyzed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ATS ANALYSES
CREATE TABLE IF NOT EXISTS ats_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    overall_score INT NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    category_scores JSONB NOT NULL,
    strengths TEXT[],
    issues JSONB NOT NULL,
    suggested_keywords JSONB,
    parsing_checks JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. JOB LISTINGS (India Focused)
CREATE TABLE IF NOT EXISTS job_listings (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    company_logo TEXT,
    location VARCHAR(255) NOT NULL,
    workplace_type VARCHAR(50) NOT NULL CHECK (workplace_type IN ('Remote', 'Hybrid', 'On-site')),
    employment_type VARCHAR(50) NOT NULL,
    experience_range VARCHAR(100),
    salary_range VARCHAR(100),
    description TEXT NOT NULL,
    required_skills TEXT[] NOT NULL,
    preferred_skills TEXT[],
    responsibilities TEXT[],
    source VARCHAR(100) NOT NULL,
    application_url TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL,
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. JOB INTERACTIONS (Saved & Click Tracking)
CREATE TABLE IF NOT EXISTS job_saved (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id VARCHAR(100) NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, job_id)
);

CREATE TABLE IF NOT EXISTS job_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id VARCHAR(100) NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
    source VARCHAR(100) NOT NULL,
    destination_url TEXT NOT NULL,
    clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. USER ENTITLEMENTS & FREE DOWNLOADS
CREATE TABLE IF NOT EXISTS user_entitlements (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    free_export_used BOOLEAN DEFAULT FALSE,
    free_export_used_at TIMESTAMPTZ,
    free_export_document_id UUID,
    is_subscribed BOOLEAN DEFAULT FALSE,
    subscription_plan_id VARCHAR(50),
    subscription_started_at TIMESTAMPTZ,
    subscription_expires_at TIMESTAMPTZ,
    total_exports_count INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PAYMENTS (Razorpay ₹19 for 7 Days)
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id VARCHAR(50) NOT NULL,
    base_amount NUMERIC(10, 2) NOT NULL, -- ₹19.00
    tax_amount NUMERIC(10, 2) NOT NULL,  -- ₹3.42 (18% GST)
    total_amount NUMERIC(10, 2) NOT NULL, -- ₹22.42
    currency VARCHAR(10) DEFAULT 'INR',
    razorpay_order_id VARCHAR(255) NOT NULL UNIQUE,
    razorpay_payment_id VARCHAR(255) UNIQUE,
    razorpay_signature VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    payment_method VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 11. AUDIT & ERROR LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    target_type VARCHAR(100),
    target_id VARCHAR(255),
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_error_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    request_id VARCHAR(255),
    user_id UUID,
    retry_count INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE master_career_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_saved ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Resumes: Users can only see/modify their own
CREATE POLICY resumes_user_policy ON resumes
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Master Profile: Users can only access their own
CREATE POLICY profile_user_policy ON master_career_profiles
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
