"use client";

import React, { useState } from "react";

/* ROOT */
export function Tabs({ defaultValue, children, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Pass activeTab + setActiveTab to ALL children
  const enhance = (child) => {
    if (!child) return null;
    return React.cloneElement(child, { activeTab, setActiveTab });
  };

  return (
    <div className={"flex flex-col gap-4 " + className}>
      {React.Children.map(children, enhance)}
    </div>
  );
}

/* TAB LIST */
export function TabsList({ children, className = "", activeTab, setActiveTab }) {
  const enhance = (child) => {
    if (!child) return null;
    return React.cloneElement(child, { activeTab, setActiveTab });
  };

  return (
    <div className={"inline-flex bg-white border rounded-xl p-1 gap-1" + className}>
      {React.Children.map(children, enhance)}
    </div>
  );
}

/* TAB BUTTON */
export function TabsTrigger({
  value,
  activeTab,
  setActiveTab,
  children,
  className = "",
}) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={
        (isActive
          ? "bg-blue-600 text-white shadow "
          : "text-gray-600 hover:bg-gray-100 ") +
        "px-3 py-1 rounded-xl text-sm flex items-center gap-2 transition-all " +
        className
      }
    >
      {children}
    </button>
  );
}

/* TAB CONTENT */
export function TabsContent({ value, activeTab, children, className = "" }) {
  if (value !== activeTab) return null;

  return <div className={"mt-4 " + className}>{children}</div>;
}
