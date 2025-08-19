// user/investor/asset-investors?assetId=67ff5d8b09fb1d18b82da41b
import api from "@/lib/httpClient";
import { useState } from "react";
import toast from "react-hot-toast";

const useAssetInvestor = () => {
  const [investors, setInvestors] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);

  const getInvestors = async ({
    id,
    search,
    page = "1",
    limit = "10",
    type,
  }: {
    id: string;
    page: number | string;
    limit: string | number;
    search?: string;
    type?: string;
  }) => {
    try {
      const response = await api.get(
        `/user/investor/asset-investors?assetId=${id}&page=${page}&limit=${limit}&search=${search}&type=${type}`
      );
      setInvestors(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching investors:", error);
      toast.error(error.response?.data?.message || "Failed to fetch investors");
    }
  };

  const getDocuments = async ({ investorId, assetId }: { investorId: string; assetId: string }) => {
    if (!investorId || !assetId) return;
    try {
      const response = await api.get(
        `/investor-document-signature-tracking?investorId=${investorId}&assetId=${assetId}`
      );
      setDocuments(response.data.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      toast.error(error.response?.data?.message || "Failed to fetch documents");
    }
  };

  const handleSendDocument = async (docId: string) => {
    if (!docId) return;
    try {
      const response = await api.post(`/investor-document-signature-tracking/send-document-for-signature/${docId}`);
      toast.success("Document sent successfully");
      setDocuments((prev) =>  
        prev.map((doc) => (doc._id === docId ? { ...doc, hasSent: true } : doc))
      );
      return response.data;
    } catch (error: any) {
      console.error("Error sending document:", error);
      toast.error(error.response?.data?.message || "Failed to send document");
    }
  };

  return {
    investors,
    pagination,
    getInvestors,
    getDocuments,
    documents,
    handleSendDocument,
  };
};

export default useAssetInvestor;
