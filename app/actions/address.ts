"use server";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Address from "@/model/Address";
import { getServerSession } from "next-auth";

type AddressInput = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
};

export async function addAddress(data: AddressInput) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return {
        success: false,
        message: "User not authenticated",
        addresses: null,
      };
    }

    const addressData = {
      ...data,
      userId: session.user.id, // Add the user ID from session
    };

    const newAddress = Address.create(addressData);
    return {
      success: true,
      message: "Address added successfully",
      address: newAddress,
    };
  } catch (error) {
    console.error("Add address error:", error);

    return {
      success: false,
      message: "Failed to save address. Please try again.",
    };
  }
}

export async function getAddress() {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return {
        success: false,
        message: "User not authenticated",
        addresses: null,
      };
    }

    const addresses = await Address.find({ userId: session.user.id })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean();

    return {
      success: true,
      message: "Addresses fetched successfully",
      addresses: addresses || [],
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error fetching addresses",
      addresses: null,
    };
  }
}
