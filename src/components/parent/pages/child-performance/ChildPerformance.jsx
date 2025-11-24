
import { useState } from 'react'
import TopCard from '../ui/TopCard'
import ProgressOverTime from '../ui/ProgressOverTime'
import TopicStrengthAnalysis from '../ui/TopicStrengthAnalysis'
import AreasNeedingAttention from '../ui/AreasNeedingAttention'
import StrongAreas from '../ui/StrongAreas'
import SubjectWisePerformance from '../ui/SubjectWisePerformance'

function ChildPerformance() {

  const [selectedChild, setSelectedChild] = useState("")
  const children = ["Aarav Kumar", "Diya Sharma"]
  
  return (
    <div className="w-full py-4">

      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-[#1C398E] text-xl font-semibold">
            Performance Monitor
          </h2>
          <p className="text-[#4A5565] text-sm">
            Track your child's progress and improvement
          </p>
        </div>

        {/* Right Side Dropdown */}
        <select
          className="rounded-lg px-3 py-2 bg-gray-100 focus:ring-1 focus:ring-blue-900 text-sm"
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        >
          {children.map((child, index) => (
            <option key={index} value={child.id}>
              {child.fullName}
            </option>
          ))}
        </select>
      </div>


      {/* Top Stats Cards */}
      <TopCard />

      {/* Progress Over Time */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <ProgressOverTime />
      </div>

      {/* Subject + Topic Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <SubjectWisePerformance />
        <TopicStrengthAnalysis />
      </div>

      {/* Weak Areas + Strong Areas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <AreasNeedingAttention/>
        <StrongAreas />
      </div>

    </div>
  )
}

export default ChildPerformance
