import React from "react";
import { User, Mail, GraduationCap, MoreVertical } from "lucide-react";

const ManageChild = () => {
  const children = [
    {
      name: "Aarav Kumar",
      class: "Class 7",
      email: "aarav@example.com",
    },
    {
      name: "Diya Sharma",
      class: "Class 5",
      email: "diya@example.com",
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-[#1C398E] text-xl font-semibold">Manage Children</h2>
      <p className="text-[#4A5565] mb-6">
        View and manage all your children's accounts
      </p>

      <div className="flex flex-wrap gap-6">
        {children.map((child, index) => (
          <div
            key={index}
            className="w-[380px] h-[250px] bg-white p-6 rounded-2xl shadow-md border border-gray-100 relative hover:shadow-lg transition-shadow duration-200"
          >
            {/* 3-dots */}
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <MoreVertical size={20} />
            </button>

            {/* Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-green-400 flex items-center justify-center shadow">
                <User className="text-white" size={28} />
              </div>

              <div>
                <h3 className="text-[#1C398E] text-lg font-semibold">
                  {child.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                  <GraduationCap className="text-green-600" size={17} />
                  <span>{child.class}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <Mail className="text-blue-600" size={17} />
                  <span>{child.email}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="absolute bottom-6 left-0 w-full px-6">
              <div className="grid grid-cols-3 text-center text-sm">
                <div>
                  <p className="text-blue-600 font-bold text-base">24</p>
                  <p className="text-gray-500 text-xs">Tests</p>
                </div>
                <div>
                  <p className="text-green-600 font-bold text-base">85%</p>
                  <p className="text-gray-500 text-xs">Avg Score</p>
                </div>
                <div>
                  <p className="text-orange-600 font-bold text-base">3</p>
                  <p className="text-gray-500 text-xs">Pending</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


  );
};

export default ManageChild;
