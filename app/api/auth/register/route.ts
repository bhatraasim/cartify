import { connectToDatabase } from "@/lib/db";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request:NextRequest){
    try {
        const { email , password } = await request.json()
        if (!email || !password) {
            return NextResponse.json(
                {error:"Email and passoword are requried"},
                {status:400}
            )
        }
        await connectToDatabase()
        const existingUser = await User.findOne({email})

        if (existingUser) {
            return NextResponse.json(
                {error:"User already exists "},
                {status:400}
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {message:"User created succefully"},
            {status:201}
        )

    } catch (error:unknown) {
        return NextResponse.json(
            {error:error},
            {status:500}
        )
    }
}