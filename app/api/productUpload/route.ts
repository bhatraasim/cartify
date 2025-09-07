import { connectToDatabase } from "@/lib/db";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()

        const body = await req.json()
        const { title  , desc , price , category, size, color, url }  = body

        if (!title || !desc || !price || !category || !url) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newProduct = await Product.create({
            title,
            desc,
            price,
            category,
            size,
            color,
            url // 👈 save cloudinary image url
        })

        return NextResponse.json({ success: true, product: newProduct });


    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
    }
}
