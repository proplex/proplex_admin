

import * as React from "react"
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

interface FilterOption {
  id: string
  label: string
  enabled: boolean
}

const defaultFilters: FilterOption[] = [
  { id: "booked", label: "Booked", enabled: false },
  { id: "Token_Transfer", label: "Token transfer", enabled: false },
  { id: "Document_Signature_Pending", label: "Document Signature Pending", enabled: false },
  { id: "Full_Payment_Done", label: "Full Payment Done", enabled: false },
  { id: "Cancelled_Request", label: "Cancelled Request", enabled: false },
  { id: "Refund", label: "Refund", enabled: false },
  { id: "Full_Payment_Pending", label: "Full Payment Pending", enabled: false },
]

interface FilterDropdownProps {
  onFiltersChange: (filters: FilterOption[]) => void
  selectedStatus?: string
}

export function FilterDropdown({ onFiltersChange, selectedStatus }: FilterDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [filters, setFilters] = React.useState<FilterOption[]>(() => 
    defaultFilters.map(filter => ({
      ...filter,
      enabled: filter.id === selectedStatus
    }))
  )

  const handleToggle = (id: string) => {
    setFilters(prev => {
      const newFilters = prev.map(filter => ({
        ...filter,
        enabled: filter.id === id ? !filter.enabled : false
      }))
      onFiltersChange(newFilters)
      return newFilters
    })
  }   

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 rounded-xl bg-gray-100"
          aria-label="Filter options"
        >
          Filter
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] p-4" align="end">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Select Status</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setOpen(false)}
            aria-label="Close filter menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-medium">{filter.label}</span>
              <Switch
                checked={filter.enabled}
                onCheckedChange={() => handleToggle(filter.id)}
                aria-label={`Toggle ${filter.label} filter`}
              />
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

