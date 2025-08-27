-- Create companies table with all required fields for company creation
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(255),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  industry VARCHAR(100),
  description TEXT,
  user_id UUID REFERENCES auth.users(id),
  -- Additional company fields
  pan_number VARCHAR(10),
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(6),
  incorporation_type VARCHAR(50),
  instrument VARCHAR(50),
  llp_agreement_copy TEXT,
  moa TEXT,
  aoi TEXT,
  spv_memo TEXT,
  risk_disclosure TEXT
);

-- Create company_board_members table for board member information
CREATE TABLE company_board_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  email VARCHAR(255),
  dsc_din VARCHAR(100),
  note TEXT,
  has_dsc_din VARCHAR(10),
  relevant_document TEXT,
  provides_customer_support VARCHAR(10),
  whatsapp_number VARCHAR(20)
);

-- Create company_legal_advisors table for legal advisor information
CREATE TABLE company_legal_advisors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255),
  full_name VARCHAR(255),
  firm VARCHAR(255),
  firm_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  designation VARCHAR(100),
  linkedin VARCHAR(255),
  website VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(6),
  country VARCHAR(100)
);

-- Create company_bank_accounts table for bank account information
CREATE TABLE company_bank_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  account_holder_name VARCHAR(255),
  bank_name VARCHAR(255),
  account_number VARCHAR(50),
  ifsc_code VARCHAR(20),
  category VARCHAR(50),
  additional_information TEXT
);

-- Create assets table with all required fields for asset creation
CREATE TABLE assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  value DECIMAL(12, 2),
  location TEXT,
  status VARCHAR(50) DEFAULT 'active',
  company_id UUID REFERENCES companies(id),
  -- Asset-specific fields
  category VARCHAR(100),
  sub_category VARCHAR(100),
  stage VARCHAR(50),
  style VARCHAR(50),
  currency VARCHAR(10),
  instrument_type VARCHAR(50),
  class VARCHAR(50),
  about TEXT,
  -- Category-specific fields
  server_capacity INTEGER,
  power_capacity DECIMAL(10, 2),
  tier_level VARCHAR(20),
  connectivity_providers TEXT,
  edge_nodes INTEGER,
  latency_ms INTEGER,
  coverage_area VARCHAR(100),
  storage_capacity DECIMAL(12, 2),
  temperature_range VARCHAR(50),
  certifications TEXT,
  validation_level VARCHAR(20),
  warehouse_area DECIMAL(12, 2),
  dock_doors INTEGER,
  clear_height DECIMAL(5, 2),
  automated_systems BOOLEAN,
  proximity_to_transport TEXT,
  total_desks INTEGER,
  private_offices INTEGER,
  meeting_rooms INTEGER,
  has_24_hour_access BOOLEAN,
  amenities_included TEXT,
  solar_capacity DECIMAL(10, 2),
  manufacturing_area DECIMAL(12, 2),
  industrial_zoning VARCHAR(100),
  battery_capacity DECIMAL(12, 2),
  battery_technology VARCHAR(100),
  grid_connection_capacity DECIMAL(10, 2),
  renewable_capacity DECIMAL(10, 2),
  sustainability_certifications TEXT,
  retail_space DECIMAL(12, 2),
  frontage DECIMAL(8, 2),
  foot_traffic INTEGER,
  corner_location BOOLEAN,
  nearby_anchors TEXT,
  number_of_rooms INTEGER,
  star_rating VARCHAR(20),
  average_occupancy DECIMAL(5, 2),
  brand_affiliation VARCHAR(100),
  proximity_to_attractions TEXT,
  total_floors INTEGER,
  retail_area DECIMAL(12, 2),
  office_area DECIMAL(12, 2),
  residential_units INTEGER,
  transit_connected BOOLEAN,
  mixed_use_components TEXT,
  -- Token information fields
  total_number_of_sfts INTEGER,
  price_per_sft DECIMAL(12, 2),
  expected_annual_return DECIMAL(5, 2),
  investment_horizon INTEGER
);

-- Create asset_locations table for nearby locations
CREATE TABLE asset_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  name VARCHAR(255),
  distance DECIMAL(8, 2),
  type VARCHAR(50)
);

-- Create asset_documents table for media and documents
CREATE TABLE asset_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  type VARCHAR(50), -- 'image', 'video', 'document', 'pitch_deck'
  url TEXT,
  name VARCHAR(255),
  description TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_assets_company_id ON assets(company_id);
CREATE INDEX idx_company_board_members_company_id ON company_board_members(company_id);
CREATE INDEX idx_company_legal_advisors_company_id ON company_legal_advisors(company_id);
CREATE INDEX idx_company_bank_accounts_company_id ON company_bank_accounts(company_id);
CREATE INDEX idx_asset_locations_asset_id ON asset_locations(asset_id);
CREATE INDEX idx_asset_documents_asset_id ON asset_documents(asset_id);

-- Set up Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_board_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_legal_advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for companies
CREATE POLICY "Users can view their own companies" ON companies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own companies" ON companies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companies" ON companies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own companies" ON companies
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for company_board_members
CREATE POLICY "Users can view board members for their companies" ON company_board_members
  FOR SELECT USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert board members for their companies" ON company_board_members
  FOR INSERT WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update board members for their companies" ON company_board_members
  FOR UPDATE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete board members for their companies" ON company_board_members
  FOR DELETE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

-- Create policies for company_legal_advisors
CREATE POLICY "Users can view legal advisors for their companies" ON company_legal_advisors
  FOR SELECT USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert legal advisors for their companies" ON company_legal_advisors
  FOR INSERT WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update legal advisors for their companies" ON company_legal_advisors
  FOR UPDATE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete legal advisors for their companies" ON company_legal_advisors
  FOR DELETE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

-- Create policies for company_bank_accounts
CREATE POLICY "Users can view bank accounts for their companies" ON company_bank_accounts
  FOR SELECT USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert bank accounts for their companies" ON company_bank_accounts
  FOR INSERT WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update bank accounts for their companies" ON company_bank_accounts
  FOR UPDATE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete bank accounts for their companies" ON company_bank_accounts
  FOR DELETE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

-- Create policies for assets
CREATE POLICY "Users can view assets for their companies" ON assets
  FOR SELECT USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert assets for their companies" ON assets
  FOR INSERT WITH CHECK (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update assets for their companies" ON assets
  FOR UPDATE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete assets for their companies" ON assets
  FOR DELETE USING (company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  ));

-- Create policies for asset_locations
CREATE POLICY "Users can view locations for their assets" ON asset_locations
  FOR SELECT USING (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can insert locations for their assets" ON asset_locations
  FOR INSERT WITH CHECK (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can update locations for their assets" ON asset_locations
  FOR UPDATE USING (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can delete locations for their assets" ON asset_locations
  FOR DELETE USING (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

-- Create policies for asset_documents
CREATE POLICY "Users can view documents for their assets" ON asset_documents
  FOR SELECT USING (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can insert documents for their assets" ON asset_documents
  FOR INSERT WITH CHECK (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can update documents for their assets" ON asset_documents
  FOR UPDATE USING (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can delete documents for their assets" ON asset_documents
  FOR DELETE USING (asset_id IN (
    SELECT id FROM assets WHERE company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  ));

-- Grant permissions to authenticated users
GRANT ALL ON TABLE companies TO authenticated;
GRANT ALL ON TABLE users TO authenticated;
GRANT ALL ON TABLE assets TO authenticated;
GRANT ALL ON TABLE company_board_members TO authenticated;
GRANT ALL ON TABLE company_legal_advisors TO authenticated;
GRANT ALL ON TABLE company_bank_accounts TO authenticated;
GRANT ALL ON TABLE asset_locations TO authenticated;
GRANT ALL ON TABLE asset_documents TO authenticated;