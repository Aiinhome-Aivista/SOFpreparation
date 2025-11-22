import { Routes, Route } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../../components/Home"
import StudentDashboard from "../../components/student/pages/dashboard/StudentDashboard"
import GenerateTestParent from "../../components/parent/pages/generate-test/GenerateTestParent"
import ParentDashboard from "../../components/parent/pages/dashboard/ParentDashboard"
import AdminDashboard from "../../components/admin/dashboard/AdminDashboard"

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="parent/dashboard" element={<Layout><ParentDashboard/></Layout>} />
      <Route path="parent/generate-test" element={<Layout><GenerateTestParent/></Layout>} />
      <Route path="student/dashboard" element={<Layout><StudentDashboard/></Layout>} />
      <Route path="admin/dashboard" element={<Layout><AdminDashboard/></Layout>} />
    </Routes >
  )
}

export default Index