import React from "react";
import { cn } from "./utils";

/**
 * Card Component
 * Used for Olympiad Exam cards, Feature highlights, and Testimonials.
 */
function Card({ className = "", ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white text-slate-900 flex flex-col gap-6 rounded-2xl border border-slate-200 transition-all",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className = "", ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={cn("font-bold leading-none text-[#1e293b]", className)}
      {...props}
    />
  );
}

function CardDescription({ className = "", ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-slate-500 leading-relaxed", className)}
      {...props}
    />
  );
}

function CardAction({ className = "", ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className = "", ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className = "", ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};