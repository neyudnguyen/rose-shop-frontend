import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, FileText, BarChart3, Grid3X3, Search, Plus } from "lucide-react"

const users = [
  {
    id: "U001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: "U002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Seller",
    status: "Active",
    joinDate: "2024-02-20",
  },
  {
    id: "U003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Customer",
    status: "Inactive",
    joinDate: "2024-03-10",
  },
]

export default function UsersPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-semibold mb-8">Admin Dashboard</h1>
        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <Grid3X3 className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/users" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-md">
            <Users className="w-4 h-4" />
            Users
          </Link>
          <Link
            href="/categories"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <Grid3X3 className="w-4 h-4" />
            Categories
          </Link>
          <Link
            href="/reports"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <FileText className="w-4 h-4" />
            Reports
          </Link>
          <Link
            href="/statistics"
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
          <h2 className="text-2xl font-semibold">User Management</h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">User ID</th>
                  <th className="text-left p-4 font-medium text-gray-600">Name</th>
                  <th className="text-left p-4 font-medium text-gray-600">Email</th>
                  <th className="text-left p-4 font-medium text-gray-600">Role</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Join Date</th>
                  <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0">
                    <td className="p-4">{user.id}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <Badge variant="outline">{user.role}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={user.status === "Active" ? "default" : "secondary"}
                        className={user.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-600">{user.joinDate}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          Edit
                        </Button>
                        <Button variant="link" className="p-0 h-auto text-red-600">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Categories</h3>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Roses</h4>
              <p className="text-sm text-gray-600">Beautiful rose arrangements</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">45 products</span>
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  Manage
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Lilies</h4>
              <p className="text-sm text-gray-600">Elegant lily bouquets</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">32 products</span>
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  Manage
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Mixed Bouquets</h4>
              <p className="text-sm text-gray-600">Colorful mixed arrangements</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">28 products</span>
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  Manage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
