import { connectToDatabase } from "@/lib/db";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    
    // Parse JSON body to get search query
    const { query = "" } = await req.json();
    
    let products;

    
        if (query && query.trim() !== "") {
      
      products = await Product.find({
        $or: [
          { title: { $regex: query, $options: "i" } },        
          { desc: { $regex: query, $options: "i" } },      
          { category: { $regex: query, $options: "i" } }   
        ]
      }).sort({ createdAt: -1 }).exec();
      

    } else {

      products = await Product.find({}).sort({ createdAt: -1 }).exec();

    }
    
    return NextResponse.json({ success: true, products });
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    const message =
    error instanceof Error
      ? error.message
      : "Failed to fetch products";
    return NextResponse.json(
      
      { success: false, error: message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}