import { supabase } from '@/lib/supabaseClient';

// Company creation service
export const createCompany = async (companyData: any) => {
  try {
    // Extract related data
    const { 
      boardMembers = [], 
      legalAdvisors = [], 
      bankAccounts = [], 
      ...companyFields 
    } = companyData;

    // Insert company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert([companyFields])
      .select()
      .single();

    if (companyError) {
      throw new Error(companyError.message);
    }

    // Insert board members
    if (boardMembers.length > 0) {
      const boardMembersWithCompanyId = boardMembers.map((member: any) => ({
        ...member,
        company_id: company.id
      }));

      const { error: boardError } = await supabase
        .from('company_board_members')
        .insert(boardMembersWithCompanyId);

      if (boardError) {
        throw new Error(boardError.message);
      }
    }

    // Insert legal advisors
    if (legalAdvisors.length > 0) {
      const legalAdvisorsWithCompanyId = legalAdvisors.map((advisor: any) => ({
        ...advisor,
        company_id: company.id
      }));

      const { error: legalError } = await supabase
        .from('company_legal_advisors')
        .insert(legalAdvisorsWithCompanyId);

      if (legalError) {
        throw new Error(legalError.message);
      }
    }

    // Insert bank accounts
    if (bankAccounts.length > 0) {
      const bankAccountsWithCompanyId = bankAccounts.map((account: any) => ({
        ...account,
        company_id: company.id
      }));

      const { error: bankError } = await supabase
        .from('company_bank_accounts')
        .insert(bankAccountsWithCompanyId);

      if (bankError) {
        throw new Error(bankError.message);
      }
    }

    return { data: company, message: 'Company created successfully' };
  } catch (error) {
    throw error;
  }
};

// Update company service
export const updateCompany = async (companyId: string, companyData: any) => {
  try {
    // Extract related data
    const { 
      boardMembers = [], 
      legalAdvisors = [], 
      bankAccounts = [], 
      ...companyFields 
    } = companyData;

    // Update company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .update(companyFields)
      .eq('id', companyId)
      .select()
      .single();

    if (companyError) {
      throw new Error(companyError.message);
    }

    // Update board members
    // First delete existing board members
    await supabase
      .from('company_board_members')
      .delete()
      .eq('company_id', companyId);

    // Then insert new board members
    if (boardMembers.length > 0) {
      const boardMembersWithCompanyId = boardMembers.map((member: any) => ({
        ...member,
        company_id: companyId
      }));

      const { error: boardError } = await supabase
        .from('company_board_members')
        .insert(boardMembersWithCompanyId);

      if (boardError) {
        throw new Error(boardError.message);
      }
    }

    // Update legal advisors
    // First delete existing legal advisors
    await supabase
      .from('company_legal_advisors')
      .delete()
      .eq('company_id', companyId);

    // Then insert new legal advisors
    if (legalAdvisors.length > 0) {
      const legalAdvisorsWithCompanyId = legalAdvisors.map((advisor: any) => ({
        ...advisor,
        company_id: companyId
      }));

      const { error: legalError } = await supabase
        .from('company_legal_advisors')
        .insert(legalAdvisorsWithCompanyId);

      if (legalError) {
        throw new Error(legalError.message);
      }
    }

    // Update bank accounts
    // First delete existing bank accounts
    await supabase
      .from('company_bank_accounts')
      .delete()
      .eq('company_id', companyId);

    // Then insert new bank accounts
    if (bankAccounts.length > 0) {
      const bankAccountsWithCompanyId = bankAccounts.map((account: any) => ({
        ...account,
        company_id: companyId
      }));

      const { error: bankError } = await supabase
        .from('company_bank_accounts')
        .insert(bankAccountsWithCompanyId);

      if (bankError) {
        throw new Error(bankError.message);
      }
    }

    return { data: company, message: 'Company updated successfully' };
  } catch (error) {
    throw error;
  }
};

// Asset creation service
export const createAsset = async (assetData: any) => {
  try {
    // Extract related data
    const { 
      nearByLocations = [], 
      documents = [], 
      ...assetFields 
    } = assetData;

    // Insert asset
    const { data: asset, error: assetError } = await supabase
      .from('assets')
      .insert([assetFields])
      .select()
      .single();

    if (assetError) {
      throw new Error(assetError.message);
    }

    // Insert nearby locations
    if (nearByLocations.length > 0) {
      const locationsWithAssetId = nearByLocations.map((location: any) => ({
        ...location,
        asset_id: asset.id
      }));

      const { error: locationError } = await supabase
        .from('asset_locations')
        .insert(locationsWithAssetId);

      if (locationError) {
        throw new Error(locationError.message);
      }
    }

    // Insert documents
    if (documents.length > 0) {
      const documentsWithAssetId = documents.map((doc: any) => ({
        ...doc,
        asset_id: asset.id
      }));

      const { error: documentError } = await supabase
        .from('asset_documents')
        .insert(documentsWithAssetId);

      if (documentError) {
        throw new Error(documentError.message);
      }
    }

    return { data: asset, message: 'Asset created successfully' };
  } catch (error) {
    throw error;
  }
};

// Update asset service
export const updateAsset = async (assetId: string, assetData: any) => {
  try {
    // Extract related data
    const { 
      nearByLocations = [], 
      documents = [], 
      ...assetFields 
    } = assetData;

    // Update asset
    const { data: asset, error: assetError } = await supabase
      .from('assets')
      .update(assetFields)
      .eq('id', assetId)
      .select()
      .single();

    if (assetError) {
      throw new Error(assetError.message);
    }

    // Update nearby locations
    // First delete existing locations
    await supabase
      .from('asset_locations')
      .delete()
      .eq('asset_id', assetId);

    // Then insert new locations
    if (nearByLocations.length > 0) {
      const locationsWithAssetId = nearByLocations.map((location: any) => ({
        ...location,
        asset_id: assetId
      }));

      const { error: locationError } = await supabase
        .from('asset_locations')
        .insert(locationsWithAssetId);

      if (locationError) {
        throw new Error(locationError.message);
      }
    }

    // Update documents
    // First delete existing documents
    await supabase
      .from('asset_documents')
      .delete()
      .eq('asset_id', assetId);

    // Then insert new documents
    if (documents.length > 0) {
      const documentsWithAssetId = documents.map((doc: any) => ({
        ...doc,
        asset_id: assetId
      }));

      const { error: documentError } = await supabase
        .from('asset_documents')
        .insert(documentsWithAssetId);

      if (documentError) {
        throw new Error(documentError.message);
      }
    }

    return { data: asset, message: 'Asset updated successfully' };
  } catch (error) {
    throw error;
  }
};

// Get company by ID with related data
export const getCompanyById = async (companyId: string) => {
  try {
    // Get company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (companyError) {
      throw new Error(companyError.message);
    }

    // Get board members
    const { data: boardMembers, error: boardError } = await supabase
      .from('company_board_members')
      .select('*')
      .eq('company_id', companyId);

    if (boardError && boardError.code !== 'PGRST116') { // PGRST116 is "no rows found"
      throw new Error(boardError.message);
    }

    // Get legal advisors
    const { data: legalAdvisors, error: legalError } = await supabase
      .from('company_legal_advisors')
      .select('*')
      .eq('company_id', companyId);

    if (legalError && legalError.code !== 'PGRST116') {
      throw new Error(legalError.message);
    }

    // Get bank accounts
    const { data: bankAccounts, error: bankError } = await supabase
      .from('company_bank_accounts')
      .select('*')
      .eq('company_id', companyId);

    if (bankError && bankError.code !== 'PGRST116') {
      throw new Error(bankError.message);
    }

    return {
      ...company,
      boardMembers: boardMembers || [],
      legalAdvisors: legalAdvisors || [],
      bankAccounts: bankAccounts || []
    };
  } catch (error) {
    throw error;
  }
};

// Get asset by ID with related data
export const getAssetById = async (assetId: string) => {
  try {
    // Get asset
    const { data: asset, error: assetError } = await supabase
      .from('assets')
      .select('*')
      .eq('id', assetId)
      .single();

    if (assetError) {
      throw new Error(assetError.message);
    }

    // Get nearby locations
    const { data: nearByLocations, error: locationError } = await supabase
      .from('asset_locations')
      .select('*')
      .eq('asset_id', assetId);

    if (locationError && locationError.code !== 'PGRST116') {
      throw new Error(locationError.message);
    }

    // Get documents
    const { data: documents, error: documentError } = await supabase
      .from('asset_documents')
      .select('*')
      .eq('asset_id', assetId);

    if (documentError && documentError.code !== 'PGRST116') {
      throw new Error(documentError.message);
    }

    return {
      ...asset,
      nearByLocations: nearByLocations || [],
      documents: documents || []
    };
  } catch (error) {
    throw error;
  }
};

// User creation service
export const createUser = async (userData: any) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { data, message: 'User created successfully' };
  } catch (error) {
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Update user
export const updateUser = async (userId: string, userData: any) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { data, message: 'User updated successfully' };
  } catch (error) {
    throw error;
  }
};