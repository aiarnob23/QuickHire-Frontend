import { Suspense } from "react"
import AdminDashboardJobPage from "@/components/adminLayout/AdminDashboardJobPage"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AdminDashboardJobPage />
    </Suspense>
  )
}