export type FormStep = {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "not-completed";
};

export type SubStep = {
  id: string;
  title: string;
  parentId: string;
  status: "completed" | "in-progress" | "not-completed";
};

export type ProjectFormData = {
  basicDetails: {
    title: string;
    about : string;
    tokenShareName: string;
    symbol: string;
    shareType: string;
    contentType: number;
    stage_of_production : string;
    ownershipModel: string;
    projectManager: string;
 

    totalSupply: number;
    tokenPriceInINR: number;
    royaltyPercentage: number;
   
    individual_group: string;
    step_completed: number;
  };
  investment: {
    ipPercentage: string;
    rights: string;
    fandoraPercentage: string;
    duration: string;
    acquisitionCost: string;
  };
  producers: Array<{
    name: string;
    expense: string;
    trackRecord: string;
  }>;
  directors: Array<{
    name: string;
    trackRecord: string;
  }>;
  starCast: Array<{
    name: string;
    trackRecord: string;
  }>;
  keyProductionCrew: Array<{
    name: string;
    keyArea: string;
    trackRecord: string;
  }>;
  investmentDetails: {
    totalExpectedInvestment: string;
    tokenAmount: string;
    totalTokens: string;
    expectedMonetization: string;
    proposedIRR: string;
    proposedMoneyMultiple: string;
    expectedDurationOfInvestment: string;
    otherTerms: string;
  };
  media: {
    featuredImage: File | null;
    mediaType: "image" | "video" | "audio" | "sm-link";
    gallery: File[];
  };
  documents: Array<{
    type: string;
    file: File | null;
  }>;

  otherDetails: {
    name: string;
    address: string;
    totalProject: number;
    ownerShipModel: string;
    file: any;
    tandc: string;
    escrowAccount: string;
    legalAdvisory: string;
    projectManagement: string;
    platformFee: string;
    email: string;
    mobile_no: string;
    pan_number:string;
    website: string;
    socialMedia: string;
  };
};
