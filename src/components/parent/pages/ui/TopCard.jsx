import React from "react";
import { Calendar, TrendingUp, Award, Target } from "lucide-react";

function TopCard() {
  const stats = [
    {
      id: 1,
      label: "Total Tests",
      value: 24,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 2,
      label: "Average Score",
      value: "85%",
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 3,
      label: "Improvement",
      value: "+12%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: 4,
      label: "Rank",
      value: "#12",
      icon: <Target className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-white shadow-sm border border-slate-100 px-4 py-3"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">
                {item.label}
              </p>
              <p className="text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
            <div className="flex items-center justify-center rounded-full bg-indigo-50 w-10 h-10 text-indigo-500">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCard;
