-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    uid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    enrollment_no TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name TEXT NOT NULL,
    club_name TEXT NOT NULL,
    fee INTEGER NOT NULL DEFAULT 0,
    is_free BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    payment_status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create epasses table
CREATE TABLE epasses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    qr_data JSONB NOT NULL,
    pass_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE epasses ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
    FOR ALL
    USING (auth.uid() = id);

-- Create policies for events table
CREATE POLICY "All authenticated users can view events" ON events
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create policies for registrations table
CREATE POLICY "Users can view their own registrations" ON registrations
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own registrations" ON registrations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policies for payments table
CREATE POLICY "Users can view their own payments" ON payments
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments" ON payments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policies for epasses table
CREATE POLICY "Users can view their own epasses" ON epasses
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own epasses" ON epasses
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_enrollment ON users(enrollment_no);
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_epasses_user_id ON epasses(user_id);

-- Create function to generate unique UID
CREATE OR REPLACE FUNCTION generate_user_uid()
RETURNS TRIGGER AS $$
BEGIN
    NEW.uid := 'USR-' || UPPER(REPLACE(gen_random_bytes(6)::text, '\', ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate UID
CREATE TRIGGER trigger_generate_user_uid
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION generate_user_uid();

-- Insert sample events data
INSERT INTO events (event_name, club_name, fee, is_free) VALUES
('Tech Symposium', 'Computer Science Club', 0, true),
('Coding Competition', 'Programming Club', 200, false),
('Robotics Workshop', 'Robotics Club', 500, false),
('Hackathon', 'Innovation Club', 0, true),
('Web Development Bootcamp', 'Web Dev Club', 300, false),
('AI/ML Seminar', 'AI Club', 0, true),
('Game Development Challenge', 'Game Dev Club', 250, false),
('Data Science Workshop', 'Data Science Club', 400, false);