import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, BarChart3, Grid3X3 } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-semibold mb-8">Admin Dashboard</h1>
        <nav className="space-y-2">
          <Link href="/admin-dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-md">
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
          <Link
            href="/admin-dashboard/statistics"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <BarChart3 className="w-4 h-4" />
            Statistics
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-4 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Report R1002 resolved</span>
                  <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">New user registered</span>
                  <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Category updated</span>
                  <span className="text-xs text-gray-500 ml-auto">10 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin-dashboard/reports" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                  <FileText className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm">View Reports</span>
                </Link>
                <Link href="/admin-dashboard/users" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm">Manage Users</span>
                </Link>
                <Link href="/admin-dashboard/statistics" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm">View Stats</span>
                </Link>
                <Link href="/admin-dashboard/categories" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                  <Grid3X3 className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm">Categories</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
