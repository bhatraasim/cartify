

import { Users, FileText, Activity, Settings, BarChart3, Plus } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Admin</h1>
            
            <div className="flex items-center gap-4  py-2 px-2.5 bg-yellow-400 rounded-2xl">
              <Link href={"/admin/addProduct"} className="text-sm font-medium text-gray-700">
                <span> Add Product </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button className="py-4 px-2 border-b-2 border-yellow-400 text-gray-900 font-medium">
              Dashboard
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-900">
              Users
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-900">
              Content
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-900">
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">2,543</p>
              </div>
              <Users className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Content</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">892</p>
              </div>
              <FileText className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">147</p>
              </div>
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reports</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">23</p>
              </div>
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                <button className="px-3 py-1.5 text-sm bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors">
                  View All
                </button>
              </div>
              
              {/* Chart Area */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Analytics Chart</p>
                </div>
              </div>
            </div>

            {/* Recent Items */}
            <div className="mt-6 bg-white border border-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 py-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Content updated</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">System backup completed</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  <Plus className="w-4 h-4 text-yellow-400" />
                  Add New User
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  <FileText className="w-4 h-4 text-yellow-400" />
                  Create Content
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  <Settings className="w-4 h-4 text-yellow-400" />
                  System Settings
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Online</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Connected</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">75% Used</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}