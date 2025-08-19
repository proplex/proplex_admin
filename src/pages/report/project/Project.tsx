import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/TableComponent";

const columns = [
  { header: "id", accessorKey: "id" },
  { header: "name", accessorKey: "name" },
  { header: "company name", accessorKey: "company_name" },
  { header: "total property value", accessorKey: "total_property_value" },
  { header: "total token", accessorKey: "total_token" },
  { header: "token value", accessorKey: "token_value" },
  { header: "total token bought", accessorKey: "total_token_bought" },
  { header: "total bought percentage", accessorKey: "total_bought_percentage" },
  { header: "total token pending", accessorKey: "total_token_pending" },
  {
    header: "total pending percentage",
    accessorKey: "total_pending_percentage",
  },
  { header: "created at", accessorKey: "created_at" },
  { header: "status", accessorKey: "status" },
  { header: "type", accessorKey: "type" },
  { header: "stage", accessorKey: "stage" },
  { header: "token created date", accessorKey: "token_created_date" },
];

const data = [
  {
    id: 1,
    name: "comapny name ",
    company_name: "Companylkdnlkqwmd",
    total_property_value: 100000,
    total_token: 1000,
    token_value: 100,
    total_token_bought: 1000,
    total_bought_percentage: 100,
    total_token_pending: 1000,
    total_pending_percentage: 100,
    created_at: "2021-01-01",
    status: "Active",
    type: "Film",
    stage: "Development",
    token_created_date: "2021-01-01",
  },
];

export function ProjectTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Project Status
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Active</SelectItem>
              <SelectItem value="No">In-Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select DAO Status
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Project Type
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Film</SelectItem>
              <SelectItem value="2">Web Series</SelectItem>
              <SelectItem value="3">Music</SelectItem>
              <SelectItem value="4">Books</SelectItem>
              <SelectItem value="5">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button className="bg-teal-500 text-white">Generate Report</Button>
        <Button variant="outline">Clear Selection</Button>
      </div>
      <div className="rounded-lg border bg-white overflow-x-auto">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}
