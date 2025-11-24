import React from "react";

function StrongAreas() {
  const items = [
    {
      title: "English - Grammar",
      subtitle: "Average: 92%",
      status: "Excellent",
      badgeClass: "bg-emerald-100 text-emerald-700",
      cardClass: "bg-emerald-50/60",
    },
    {
      title: "Mathematics - Algebra",
      subtitle: "Average: 88%",
      status: "Strong",
      badgeClass: "bg-blue-100 text-blue-700",
      cardClass: "bg-blue-50/60",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 md:p-6 h-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
        Strong Areas
      </h3>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between rounded-lg px-4 py-3 ${item.cardClass}`}
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

export default StrongAreas;
