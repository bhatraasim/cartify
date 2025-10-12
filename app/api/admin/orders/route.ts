// app/api/admin/orders/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Order from '@/model/Order'; // adjust based on your Order model
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.error('ADMIN_EMAIL environment variable is not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (session.user.email !== adminEmail) {
      console.warn(`Unauthorized admin access attempt by: ${session.user.email}`);
      return NextResponse.json(
        { success: false, message: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Get all completed orders
    const completedOrders = await Order
      .find({ status: 'completed' })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate({
        path: 'userId',
        select: 'name email', 
      }) // Populate user details if needed
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: completedOrders.length,
        orders: completedOrders,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching completed orders:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
