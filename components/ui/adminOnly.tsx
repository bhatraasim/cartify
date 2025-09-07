'use client'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

interface AdminOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
    return <div className="p-4">Loading...</div>
  }
  
  if (!session) {
    return fallback || <div className="p-4 text-red-600">Please sign in first</div>
  }
  
  if (!session.user.isAdmin) {
    return fallback || (
      <div className="p-4 text-red-600">
        Access Denied. Admin privileges required.
      </div>
    )
  }
  
  return <>{children}</>
}