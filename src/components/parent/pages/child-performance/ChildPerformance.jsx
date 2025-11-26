
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../../common/helper/UserContext'
import { Dropdown } from 'primereact/dropdown';
import { Loader } from 'lucide-react'
import TopCard from '../ui/TopCard'
import ProgressOverTime from '../ui/ProgressOverTime'
import TopicStrengthAnalysis from '../ui/TopicStrengthAnalysis'
import AreasNeedingAttention from '../ui/AreasNeedingAttention'
import StrongAreas from '../ui/StrongAreas'
import SubjectWisePerformance from '../ui/SubjectWisePerformance'

function ChildPerformance() {
  const [selectedChild, setSelectedChild] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const { childdetails } = useContext(UserContext);

  // Set the first child as default when the component loads
  useEffect(() => {
    if (childdetails && childdetails.length > 0 && !selectedChild) {
      setSelectedChild(childdetails[0].student_id);
    }
  }, [childdetails, selectedChild]);

  // Simulate data fetching
  useEffect(() => {
    if (selectedChild) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Simulate a 0.5 second loading time
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false); // If no child is selected, don't show loader
    }
  }, [selectedChild]); // Re-trigger loading when child changes

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
        <Dropdown
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.value)}
          options={childdetails}
          optionLabel="name"
          optionValue="student_id"
          placeholder="Select a Child"
          className="w-full md:w-64"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-blue-600" size={40} />
          <p className="ml-4 text-gray-600">Loading Performance Data...</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default ChildPerformance
