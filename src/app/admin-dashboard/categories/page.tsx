import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, BarChart3, Grid3X3, Plus, Edit, Trash2 } from "lucide-react"

const categories = [
  {
    id: "C001",
    name: "Roses",
    description: "Beautiful rose arrangements and bouquets",
    productCount: 45,
    status: "Active",
    createdDate: "2024-01-10",
  },
  {
    id: "C002",
    name: "Lilies",
    description: "Elegant lily bouquets and arrangements",
    productCount: 32,
    status: "Active",
    createdDate: "2024-01-15",
  },
  {
    id: "C003",
    name: "Mixed Bouquets",
    description: "Colorful mixed flower arrangements",
    productCount: 28,
    status: "Active",
    createdDate: "2024-02-01",
  },
  {
    id: "C004",
    name: "Sunflowers",
    description: "Bright and cheerful sunflower arrangements",
    productCount: 18,
    status: "Inactive",
    createdDate: "2024-02-15",
  },
]

export default function Categories() {
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
          <Link href="/admin-dashboard/categories" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-md">
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
          <h2 className="text-2xl font-semibold">Category Management</h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </div>

        {/* Add Category Button */}
        <div className="flex justify-end mb-6">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Card key={category.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="mt-1">{category.description}</CardDescription>
                  </div>
                  <Badge
                    variant={category.status === "Active" ? "default" : "secondary"}
                    className={category.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {category.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Products:</span>
                    <span className="font-medium">{category.productCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{category.createdDate}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">83% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
