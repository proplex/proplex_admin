

import { ChevronDown } from "lucide-react"
import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

export interface AccordionItemProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
  headerClassName,
  contentClassName,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("border border-border rounded-md mb-4 overflow-hidden", className)}>
      <div
        className={cn("flex items-center justify-between p-4 bg-card cursor-pointer", headerClassName)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-base">{title}</h3>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen && "transform rotate-180",
          )}
        />
      </div>
      {isOpen && <div className={cn("p-2 border-t", contentClassName)}>{children}</div>}
    </div>
  )
}

export interface GlobalAccordionProps {
  items: AccordionItemProps[]
  className?: string
}

export function GlobalAccordion({ items, className }: GlobalAccordionProps) {
  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          defaultOpen={item.defaultOpen}
          className={item.className}
          headerClassName={item.headerClassName}
          contentClassName={item.contentClassName}
        >
          {item.children}
        </AccordionItem>
      ))}
    </div>
  )
}

