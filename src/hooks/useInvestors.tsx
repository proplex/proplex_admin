import api from "@/lib/httpClient";
import { useState } from "react";
import toast from "react-hot-toast";

const useInvestors = () => {
  const [investors, setInvestors] = useState([]);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }>({
    currentPage: 1,
    limit: 10,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const getInvestors = async ({
    page = 1,
    limit = 10,
  }: {
    page?: number | string;
    limit?: number | string;
  }) => {
    try {
      const response = await api(
        `/user/investor/list?page=${page}&limit=${limit}`
      );
      setInvestors(response.data.data);
      setPagination(response.data.pagination);
      console.log("pagination", response.data.pagination);
      return response.data;
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "Failed to fetch investors"
      );
    }
  };
  return { getInvestors, investors, pagination };
};

export default useInvestors;
