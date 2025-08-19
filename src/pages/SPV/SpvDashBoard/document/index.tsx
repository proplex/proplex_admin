import React, { useState } from "react";
import Document from "./Document";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import CustomTabs from "@/components/ui/custom-tab";
import Financial from "./Financial";
import Governance from "./Governance";
import Legal from "./Legal";
import Investor from "./Investor";
import Property from "./Property";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Pagination from "@/layout/Pagination";
import DocumentTabs from "../SPVCustomtabs";
import SPVCustomtabs from "../SPVCustomtabs";

const Index = () => {
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);
  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "all-documents"
    : queryParams["tab"] || "all-documents";

  //Pagination
  const [pagination, setPagination] = useState<any>(null);
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const onPageChange = (page: number) => {
    navigate(`?page=${page}&limit=${limit}`);
  };

  const onPageSizeChange = (pageSize: number) => {
    navigate(`?page=${page}&limit=${pageSize}`);
  };

  const handleTabChange = (newTab: string) => {
    navigate(`?tab=${newTab}`, {
      replace: true,
    });
  };
  const tabs = [
    {
      id: "all-documents",
      title: "All Documents",
      component: (
        <div className="">
          <Document />
        </div>
      ),
    },
    {
      id: "legal",
      title: "Legal",
      component: (
        <div className="">
          <Legal />
        </div>
      ),
    },
    {
      id: "financial",
      title: "Financial",
      component: (
        <div className="">
          <Financial />
        </div>
      ),
    },
    {
      id: "governance",
      title: "Governance",
      component: (
        <div className="">
          <Governance />
        </div>
      ),
    },
    {
      id: "investor",
      title: "Investor",
      component: (
        <div className="">
          <Investor />
        </div>
      ),
    },
    {
      id: "property",
      title: "Property",
      component: (
        <div className="">
          <Property />
        </div>
      ),
    },
  ];

  return (
    <div className="px-5 py-2">
      <h1 className="text-2xl font-bold">Documents</h1>
      <p className="text-sm text-muted-foreground">
        Manage legal and financial documents for this SPV
      </p>
      <div className="px-3 py-2 rounded-lg border mt-5">
        <header className="flex h-16 shrink-0 items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-semibold">SPV Documents</h1>
            <p className="text-sm text-muted-foreground">
              Manage documents and their investments in this SPV
            </p>
          </div>
        </header>
        <div className="flex justify-between items-center gap-4 w-full px-2 mt-3">
          <Input
            placeholder="Search"
            type="search"
            className="flex-1 shadow-none"
          />
          <Button className="gap-2" variant="default">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
        </div>

        <div className="p-4">
          <SPVCustomtabs
            defaultTab={tab}
            tabs={tabs}
            handleTabChange={handleTabChange}
            aria-label="Governance Proposals"
          />
          <Pagination
            {...pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
