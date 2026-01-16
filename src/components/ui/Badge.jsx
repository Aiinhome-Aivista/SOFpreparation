
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

// 1. Define styling variants using CVA to match your platform's theme
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#2563eb] text-white", // Blue for "Most Popular"
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-white",
        outline:
          "text-foreground",
        subject: 
          "bg-blue-100 text-blue-700 border-blue-200", // Matches Exam tags
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// 2. Export the simplified functional component as requested
export function Badge({ 
  children, 
  className = "", 
  variant = "default", 
  asChild = false, 
  ...props 
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { badgeVariants };
