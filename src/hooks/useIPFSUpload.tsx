/** @format */

import { useState } from 'react';
import { PinataFileManager } from '@/lib/ipfs';
import toast from 'react-hot-toast';

interface SpaMetadata {
  name: string;
  spa_type: string;
  currency: string;
  jurisdiction: string;
  businessPurpose: string;
  llcOperatingAgreement: string;
  articlesOfAssociation: string;
  memorandumOfAssociation: string;
  otherDocuments: string;

}

interface ProjectMetadata {
  name: string;
  assetStyle: string;
  currency: string;
  instrumentType: string;
  country: string;
  state: string;
  city: string;
  landmark: string;
  description: string;
  companyName: string;
  escrowANDLegalDocument:{
  legalAdivisory:{
    legalAdivisoryURL: string;
    legalAdivisoryName: string;
  }
  assetManagementCompany:{
    assetManagementCompanyURL: string;
    assetManagementCompanyName: string;
  }
  brokerage:{
    brokerageURL: string;
    brokerageName: string;
  }
}
tenantsDetails:{
    tenantName: string;
    tenantType: string;
    sftsAllocated: number;
    rentPerSft: number;
    annualRentEscalation: number;
    startDate: string;
    endDate: string;
    leasePeriod: number;
    lockInPeriod: number;
    securityDeposit: number;
    interestOnSecurityDeposit: number;
    logo: string;
}

}

const useIPFSUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pinataManager = new PinataFileManager();

  const uploadSpaFiles = async (
    metadata: SpaMetadata
  ): Promise<{ [key: string]: string }> => {
    setLoading(true);
    setError(null);
    const fileUrls: { [key: string]: string } = {};

    try {
      // Upload spa metadata to IPFS
      const metadataCID = await pinataManager.uploadJSON(metadata, 'public', {
        name: `${metadata.name}-metadata`,
        keyvalues: {
          type: 'spa_metadata',
          company_name: metadata.name,
        },
      });
      console.log('Metadata uploaded to IPFS:', metadataCID);

      // Return the metadata CID (no file uploads)
      fileUrls['metadata'] = metadataCID; // Store metadata CID instead of file URLs

      return fileUrls;
    } catch (err: any) {
      const errorMessage =
        err.message || 'An error occurred while uploading metadata to IPFS';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const uploadProjectFiles = async (
    metadata: ProjectMetadata
  ): Promise<{ [key: string]: string }> => {
    setLoading(true);
    setError(null);
    const fileUrls: { [key: string]: string } = {};

    try {
      // Upload company metadata to IPFS
      const metadataCID = await pinataManager.uploadJSON(metadata, 'public', {
        name: `${metadata.name}-metadata`,
        keyvalues: {
          type: 'project_metadata',
          project_name: metadata.name,
        },
      });
      console.log('Metadata uploaded to IPFS in uploadProjectFiles: ', metadataCID);


      // Return the metadata CID (no file uploads)
      fileUrls['metadata'] = metadataCID; // Store metadata CID instead of file URLs

      return fileUrls;
    } catch (err: any) {
      const errorMessage =
        err.message || 'An error occurred while uploading metadata to IPFS';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  


  return { uploadSpaFiles, uploadProjectFiles, loading, error };
};

export default useIPFSUpload;
