"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, FileText, BarChart3, Grid3X3, X } from "lucide-react"

interface Report {
  id: string
  flower: string
  reason: string
  status: "resolved" | "pending" | "investigating"
  reporter: string
  seller: string
}

const reports: Report[] = [
  {
    id: "R1001",
    flower: "Red Rose Bouquet",
    reason: "Quality Issue",
    status: "resolved",
    reporter: "Jane Smith",
    seller: "Flower Shop A",
  },
  {
    id: "R1002",
    flower: "Sunflower Bundle",
    reason: "Late Delivery",
    status: "resolved",
    reporter: "John Doe",
    seller: "Flower Shop B",
  },
]

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report)
  }

  const handleResolve = () => {
    if (selectedReport) {
      // Handle resolve logic here
      setSelectedReport(null)
    }
  }

  const handleDismiss = () => {
    setSelectedReport(null)
  }

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
          <Link href="/admin-dashboard/reports" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-md">
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
          <h2 className="text-2xl font-semibold">Report Management</h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Report ID</th>
                  <th className="text-left p-4 font-medium text-gray-600">Flower</th>
                  <th className="text-left p-4 font-medium text-gray-600">Reason</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b last:border-b-0">
                    <td className="p-4">{report.id}</td>
                    <td className="p-4">{report.flower}</td>
                    <td className="p-4">{report.reason}</td>
                    <td className="p-4">
                      <Badge
                        variant={report.status === "resolved" ? "default" : "secondary"}
                        className={report.status === "resolved" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {report.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600"
                        onClick={() => handleViewDetails(report)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Details Modal - Temporarily disabled until dialog component is fixed */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Report Details</h3>
                <Button variant="ghost" size="icon" onClick={handleDismiss} className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Flower Information</h4>
                  <p className="text-gray-600">{selectedReport.flower}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Reporter Information</h4>
                  <p className="text-gray-600">Reporter: {selectedReport.reporter}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Seller Information</h4>
                  <p className="text-gray-600">Seller: {selectedReport.seller}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleResolve} className="bg-green-600 hover:bg-green-700">
                    Resolve
                  </Button>
                  <Button variant="outline" onClick={handleDismiss}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
