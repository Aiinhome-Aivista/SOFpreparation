import React from "react";

function AreasNeedingAttention() {
  const items = [
    {
      title: "Geometry - Triangles",
      subtitle: "Average: 58%",
      status: "Weak",
      badgeClass: "bg-red-100 text-red-600",
    },
    {
      title: "Chemistry - Acids & Bases",
      subtitle: "Average: 65%",
      status: "Improving",
      badgeClass: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 md:p-6 h-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
        Areas Needing Attention
      </h3>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg bg-red-50/60 px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {item.title}
              </p>
              <p className="text-xs text-slate-500">{item.subtitle}</p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeClass}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AreasNeedingAttention;
