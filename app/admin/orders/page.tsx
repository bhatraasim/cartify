'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  userId?: {
    name?: string;
    email?: string;
  };
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  status: string;
  shippingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FIX: Add safety checks for undefined products array
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  
  const totalProducts = orders.reduce((sum, order) => {
    if (!order.products || !Array.isArray(order.products)) {
      return sum;
    }
    return sum + order.products.reduce((pSum, p) => pSum + (p.quantity || 0), 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading completed orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50/30 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Orders</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/admin')}
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50/20 to-gray-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">Completed Orders</h1>
              <p className="text-gray-600 font-medium">Manage and view all completed transactions</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-2xl shadow-xl shadow-yellow-400/20">
              <p className="text-sm font-semibold opacity-90">Total Orders</p>
              <p className="text-3xl font-black">{orders.length}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Revenue</p>
                  <p className="text-3xl font-black text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Products Sold</p>
                  <p className="text-3xl font-black text-gray-900">{totalProducts}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Avg Order Value</p>
                  <p className="text-3xl font-black text-gray-900">
                    ₹{orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : 0}
                  </p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by customer name, email, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Orders Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider">Products</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider">Shipping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-yellow-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-yellow-600 font-bold text-sm">#{index + 1}</span>
                        </div>
                        <div className="text-sm">
                          <p className="font-mono text-xs text-gray-500">{order._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{order.userId?.name || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{order.userId?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                          {order.products?.length || 0} items
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({order.products?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 0} qty)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString('en-IN')}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <p className="font-medium">{order.shippingAddress?.city || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{order.shippingAddress?.state || ''}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600">No completed orders match your search criteria.</p>
            </div>
          )}
        </div>

        {/* Orders Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredOrders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-black text-lg">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-gray-500 mb-1">Order ID</p>
                    <p className="font-semibold text-gray-900">{order._id.slice(-8)}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-xl font-bold text-lg shadow-lg shadow-yellow-400/30">
                  ₹{order.totalPrice.toLocaleString()}
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Customer</p>
                <p className="font-bold text-gray-900">{order.userId?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{order.userId?.email || 'N/A'}</p>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Products</p>
                  <p className="font-semibold text-gray-900">
                    {order.products?.length || 0} items ({order.products?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 0} qty)
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Shipping Address</p>
                <p className="text-sm text-gray-900 font-medium">
                  {order.shippingAddress?.city || 'N/A'}, {order.shippingAddress?.state || 'N/A'}
                </p>
                <p className="text-xs text-gray-600 mt-1">{order.shippingAddress?.zipCode || ''}</p>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600">No completed orders match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
