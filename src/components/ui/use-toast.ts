import * as React from "react"

import { useToast as useShadcnToast } from "@/components/ui/use-toast-shadcn"

export function useToast() {
  const { toast } = useShadcnToast()
  
  return {
    toast: (props: {
      title?: string
      description?: string
      variant?: "default" | "destructive"
    }) => {
      return toast({
        title: props.title,
        description: props.description,
        variant: props.variant,
      })
    },
  }
}
