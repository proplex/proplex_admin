# Supabase Migration Guide

This guide explains how to migrate from the previous backend implementation to the new Supabase integration.

## Table of Contents
1. [Overview](#overview)
2. [Key Changes](#key-changes)
3. [Database Schema](#database-schema)
4. [Authentication](#authentication)
5. [API Services](#api-services)
6. [Form Integration](#form-integration)
7. [Testing](#testing)

## Overview

The application has been migrated from a custom backend to Supabase as the primary backend service. This change provides:
- Real-time database capabilities
- Built-in authentication
- Automatic API generation
- Row Level Security (RLS)
- Scalable infrastructure

## Key Changes

### 1. Backend Services
- **Removed:** Custom API endpoints pointing to `dev.ryzer.app`
- **Added:** Supabase client integration
- **Modified:** Authentication flow to use Supabase Auth
- **Updated:** Data services to use Supabase database

### 2. Environment Configuration
- **Added:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env` file
- **Removed:** Previous API endpoint configurations

### 3. Data Models
- **Enhanced:** Companies table with all form fields
- **Enhanced:** Assets table with category-specific fields
- **Added:** Related tables for board members, legal advisors, bank accounts
- **Added:** Related tables for asset locations and documents

## Database Schema

### New Tables Structure

1. **companies** - Main company information
   ```sql
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
   ```

2. **assets** - Asset information with category-specific fields
   ```sql
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
     -- Category-specific fields for all 8 asset categories
     -- Token information fields
     total_number_of_sfts INTEGER,
     price_per_sft DECIMAL(12, 2),
     expected_annual_return DECIMAL(5, 2),
     investment_horizon INTEGER
   );
   ```

3. **Related Tables**
   - `company_board_members` - Board member information
   - `company_legal_advisors` - Legal advisor information
   - `company_bank_accounts` - Bank account information
   - `asset_locations` - Nearby locations for assets
   - `asset_documents` - Media and documents for assets

## Authentication

### Previous Implementation
```javascript
// Old authentication using custom API
const response = await axios.post('https://api.fandora.app/api/auth/login', { 
  phone, 
  country_code 
});
```

### New Implementation
```javascript
// New authentication using Supabase
const { data, error } = await supabase.auth.signInWithOtp({
  phone: `${country_code}${phone}`,
});
```

### Migration Steps
1. Replace all authentication calls with Supabase Auth methods
2. Update session management to use Supabase session
3. Modify protected routes to check Supabase auth state
4. Update user profile handling to use Supabase user data

## API Services

### Previous Implementation
```javascript
// Old API service
import api from '@/lib/httpClient';
export const createCompany = (body:any) => {
  return api.post('company/create', {
    ...body
  })
}
```

### New Implementation
```javascript
// New Supabase service
import { supabase } from '@/lib/supabaseClient';
export const createCompany = async (companyData: any) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([companyData])
      .select();
    
    if (error) throw new Error(error.message);
    return { data, message: 'Company created successfully' };
  } catch (error) {
    throw error;
  }
};
```

### Migration Steps
1. Replace API service calls with Supabase database operations
2. Update data transformation logic to match new schema
3. Handle related data (board members, documents, etc.) with separate table operations
4. Update error handling to work with Supabase error format

## Form Integration

### Company Forms
All company form fields are now synchronized with the database schema:
- Company information fields map directly to `companies` table columns
- Board member forms map to `company_board_members` table
- Legal advisor forms map to `company_legal_advisors` table
- Bank account forms map to `company_bank_accounts` table

### Asset Forms
All asset form fields are now synchronized with the database schema:
- Basic asset information maps to `assets` table columns
- Category-specific fields map to corresponding columns in `assets` table
- Location information maps to `asset_locations` table
- Document information maps to `asset_documents` table

### Migration Steps
1. Verify all form fields have corresponding database columns
2. Update form submission handlers to use new service methods
3. Ensure related data (arrays of objects) are properly handled
4. Update form validation to match database constraints

## Testing

### Test Components
Two test components are available to verify the integration:

1. **Simple Test** - `src/components/SupabaseTest.tsx`
   - Basic authentication and CRUD operations
   - Simple company and asset creation

2. **Comprehensive Test** - `src/components/SupabaseComprehensiveTest.tsx`
   - Full authentication flow
   - Complete company creation with related data
   - Complete asset creation with category-specific fields
   - Update and retrieval operations

### Testing Steps
1. Run the development server: `npm run dev`
2. Navigate to the test components
3. Perform authentication
4. Test company creation with all fields
5. Test asset creation with category-specific fields
6. Verify data persistence in Supabase dashboard

### Common Issues
1. **RLS Permissions** - Ensure Row Level Security policies are correctly configured
2. **Foreign Key Constraints** - Verify related data references existing records
3. **Data Type Mismatches** - Check that form data matches database column types
4. **Authentication State** - Ensure proper session management in components

## Conclusion

The migration to Supabase provides a more robust and scalable backend solution. The new implementation:
- Reduces backend complexity
- Provides real-time capabilities
- Improves data consistency
- Enhances security with built-in RLS
- Simplifies deployment and maintenance

For any issues during migration, refer to the Supabase documentation or contact the development team.