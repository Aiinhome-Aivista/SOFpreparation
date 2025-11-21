import { Routes, Route } from "react-router-dom"
import Home from "../../components/Home"
import ParentDashboard from "../../components/parent/ParentDashboard"
import GenerateTestParent from "../../components/parent/GenerateTestParent"
import StudentDashboard from "../../components/student/StudentDashboard"

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="parent/dashboard" element={<ParentDashboard />} />
      <Route path="parent/generate-test" element={<GenerateTestParent />} />
      <Route path="student/dashboard" element={<StudentDashboard/>} />
    </Routes >
  )
}

export default Index