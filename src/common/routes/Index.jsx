import { Routes, Route } from "react-router-dom"
import Home from "../../components/Home"
import StudentDashboard from "../../components/student/StudentDashboard"
import Layout from "../layout/Layout"
import GenerateTestParent from "../../components/parent/pages/generate-test/GenerateTestParent"
import ParentDashboard from "../../components/parent/pages/dashboard/ParentDashboard"

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="parent/dashboard" element={<ParentDashboard />} />
      <Route path="parent/generate-test" element={<GenerateTestParent />} />
      <Route path="student/dashboard" element={<StudentDashboard />} />
    </Routes >
  )
}

export default Index