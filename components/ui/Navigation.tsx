





'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navigation() {
  const { data: session, status } = useSession()


  

  // Show sign in for unauthenticated users
  if (!session) {
    return (null)
  }

  // Show nothing for regular users, only admin gets navigation
  if (!session.user.isAdmin) {
    return null
  }

  // Full navigation only for admins
  return (
    <nav className="bg-gray-800 text-white p-4">
      {/* Your full admin navigation here */}
      <div className="">


        <div className="">
          <Link 
                  href="/admin" 
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors"
                >
                  Admin Panel
                </Link>
        </div>




      </div>
    </nav>
  )
}