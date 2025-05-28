import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, BarChart3, Grid3X3 } from "lucide-react"

export default function Statistics() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-semibold mb-8">Admin Dashboard</h1>
        <nav className="space-y-2">
          <Link
            href="/admin-dashboard"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <Grid3X3 className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin-dashboard/users"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <Users className="w-4 h-4" />
            Users
          </Link>
          <Link
            href="/admin-dashboard/categories"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <Grid3X3 className="w-4 h-4" />
            Categories
          </Link>
          <Link
            href="/admin-dashboard/reports"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <FileText className="w-4 h-4" />
            Reports
          </Link>
          <Link href="/admin-dashboard/statistics" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-md">
            <BarChart3 className="w-4 h-4" />
            Statistics
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">System Statistics</h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Orders over time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Chart placeholder - Orders trend</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Chart placeholder - Revenue trend</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top reported products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span>Red Rose Bouquet</span>
                  <span className="font-medium">15 reports</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>White Lily Arrangement</span>
                  <span className="font-medium">12 reports</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Mixed Flower Basket</span>
                  <span className="font-medium">8 reports</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Most used vouchers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span>SUMMER2024</span>
                  <span className="font-medium">234 uses</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>WELCOME10</span>
                  <span className="font-medium">189 uses</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>BIRTHDAY25</span>
                  <span className="font-medium">156 uses</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
