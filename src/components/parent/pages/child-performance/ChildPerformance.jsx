import React from 'react'
import TopCard from '../ui/TopCard'
import ProgressOverTime from '../ui/ProgressOverTime'
import TopicStrengthAnalysis from '../ui/TopicStrengthAnalysis'
import AreasNeedingAttention from '../ui/AreasNeedingAttention'
import StrongAreas from '../ui/StrongAreas'
import SubjectWisePerformance from '../ui/SubjectWisePerformance'

function ChildPerformance() {
  return (
    <div className="w-full py-4">
      
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-[#1C398E] text-xl font-semibold">
          Performance Monitor
        </h2>
        <p className="text-[#4A5565] text-sm">
          Track your child's progress and improvement
        </p>
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
        <AreasNeedingAttention />
        <StrongAreas />
      </div>

    </div>
  )
}

export default ChildPerformance
