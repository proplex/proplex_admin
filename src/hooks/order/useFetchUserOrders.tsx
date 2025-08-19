import { defaultPagination } from "@/constants/global";
import api from "@/lib/httpClient"
import { useEffect, useState } from "react";


export const useFetchUserOrders = (page = 1, limit = 10, statusFilter = "", user_id = "") => {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(defaultPagination);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/v2/admin/order/user/${user_id}?page=${page ?? 1
          }&limit=${limit ?? 10}`
        );
        setOrders(response.data.data);
        setPagination(response.data.pager);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, limit, statusFilter]);

  return { data: orders, error, loading, pagination };
};