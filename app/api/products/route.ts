import { connectToDatabase } from "@/lib/db";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
   try {
     await connectToDatabase()

    const products = await Product.find().sort({created : -1 })
    return NextResponse.json({success : true , products})

   } catch (error:any) {

    console.error(" Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    )
   }

}