import React, { useState } from 'react'
import ManageChild from '../manage-child/ManageChild'
import GenerateTestParent from '../generate-test/GenerateTestParent'
import ChildPerformance from '../child-performance/ChildPerformance';


function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("children");

  return (
    <div className="px-8 py-4 w-full">
      {/* Tab Buttons */}
      <div className="flex gap-6 pb-3">
        {[
          { id: "children", label: "Children" },
          { id: "test", label: "Test Generator" },
          { id: "performance", label: "Child Performance" },
          

        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-lg font-medium transition ${activeTab === tab.id
              ? "text-blue-600"
              : "text-gray-600 hover:text-gray-800"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "children" && <ManageChild />}
        {activeTab === "test" && <GenerateTestParent />}
        {activeTab === "performance" && <ChildPerformance />}

      </div>
    </div>
  )
}

export default ParentDashboard