import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CustomTabs from "@/components/ui/custom-tab";
import Pagination from "@/layout/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpvApi } from "@/hooks/spv/useSpvApi";
import Filters from "./Filters";
import SPVTable from "./SPVTable";
import SPVStatusDialog from "./SPVStatusDialog";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [spv, setSpv] = useState<any>(null);
  const queryParams = queryString.parse(location.search);
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const status = Array.isArray(queryParams?.tab)
    ? queryParams.tab[0]
    : queryParams?.tab || "active";

  const {
    getSpvList,
    spvList,
    pagination,
    updateSpvStatus,
    status: apiStatus,
    statusUpdate,
    setStatusUpdate,
  } = useSpvApi();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleFilterToggle = (value: string) => {
    setSelectedFilters((prev) => {
      const normalizedValue = value.toLowerCase().replace(/\s+/g, "").trim();
      if (prev.includes(normalizedValue)) {
        return prev.filter((item) => item !== normalizedValue);
      } else {
        return [...prev, normalizedValue];
      }
    });
  };

  const removeFilter = (value: string) => {
    setSelectedFilters((prev) => prev.filter((item) => item !== value));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSearchTerm("");
  };

  const onPageChange = (page: number) => {
    navigate(`/spv-list?tab=${status}&page=${page}&limit=${limit}`);
  };

  const onPageSizeChange = (pageSize: number) => {
    navigate(`/spv-list?tab=${status}&page=1&limit=${pageSize}`);
  };

  const handleTabChange = (tabId: string) => {
    setSelectedFilters([]);
    navigate(`/spv-list?tab=${tabId}&page=1&limit=${limit}`);
  };

  const updateStatus = async () => {
    if (spv) {
      await updateSpvStatus(
        spv._id,
        spv.status === "active" ? "draft" : "active"
      );
      setSpv(null);
      setStatusUpdate("idle");
    }
  };

  useEffect(() => {
    getSpvList({
      page,
      limit,
      status: status ?? undefined,
      type: selectedFilters,
      search: debouncedSearch,
    });
  }, [page, limit, status, selectedFilters.length, debouncedSearch]);

  const isSpvStatusOpen = Boolean(spv);

  const tabs = [
    {
      id: "active",
      title: "Active",
      component: <SPVTable data={spvList} setSpv={setSpv} />,
    },
    {
      id: "draft",
      title: "Drafts",
      component: <SPVTable data={spvList} setSpv={setSpv} />,
    },
    {
      id: "in-active",
      title: "Inactive",
      component: <SPVTable data={spvList} setSpv={setSpv} />,
    },
  ];

  return (
    <div className="p-4 border border-gray-200 rounded-lg m-2 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SPV List </h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/add-spv")}
        >
          Add SPV
        </Button>
      </div>

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilters={selectedFilters}
        handleFilterToggle={handleFilterToggle}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
      />

      <SPVStatusDialog
        isOpen={isSpvStatusOpen}
        spv={spv}
        onClose={() => {
          setSpv(null);
          setStatusUpdate("idle");
        }}
        onConfirm={updateStatus}
        status={statusUpdate}
      />

      <CustomTabs
        tabs={tabs}
        defaultTab={status ?? undefined}
        aria-label="Asset information tabs"
        handleTabChange={handleTabChange}
      />

      <Pagination
        {...pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default Index;
