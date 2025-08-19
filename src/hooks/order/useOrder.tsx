import api from "@/lib/httpClient";
import { useState } from "react";
import toast from "react-hot-toast";

export const useOrder = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [ordersStatusCounts, setOrdersStatusCounts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);

  const getOrders = async ({
    search,
    page = "1",
    limit = "10",
    status,
  }: {
    page: number | string;
    limit: string | number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get(
        `/orders?page=${page}&limit=${limit}&search=${search}&currentStatus=${status}`
      );
      setOrders(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const getOrder = async (id: string) => {
    try {
      const response = await api.get(`/orders/${id}`);
      console.log("response", response.data.data);
      setOrder(response.data.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching order:", error);
      toast.error(error.response?.data?.message || "Failed to fetch order");
    }
  };

  const getOrdersStatusCounts = async () => {
    try {
      const response = await api.get("/orders/orders-count");
      setOrdersStatusCounts(response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching orders status counts:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch orders status counts"
      );
    }
  };

  const getDocuments = async ({ order }: { order: any }) => {
    if (!order) return;
    try {
      const response = await api.get(
        `/investor-document-signature-tracking?investorId=${order.investor._id}&assetId=${order.asset._id}`
      );
      setDocuments(response.data.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      toast.error(error.response?.data?.message || "Failed to fetch documents");
    }
  };

  return {
    orders,
    pagination,
    getOrders,
    getOrder,
    ordersStatusCounts,
    getOrdersStatusCounts,
    order,
    getDocuments,
    documents,
  };
};
