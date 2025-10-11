// import { authOptions } from "@/lib/auth";
// import { connectToDatabase } from "@/lib/db";
// import Cart from "@/model/Cart";
// import Order from "@/model/Order";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// })

// export async function POST(request: Request) {
//     try {
//         await connectToDatabase()
//         const session = await getServerSession(authOptions)
//         if (!session?.user?.email) {
//             return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//         }
//         console.log("User ID:", session.user.id); // Debug log

//         const cart = await Cart.findOne({ userId : session.user.id })
//         .populate({
//             path: 'items.productId',
//             select:"name price",
//         })
//         .lean()

//         console.log("Cart found:", cart); // Debug log

//         if (!cart || Array.isArray(cart) || cart.items.length === 0) {
//             return NextResponse.json({ success: false, message: "Cart is empty" }, { status: 400 })
//         }
//         let totalAmount = 0;
        
//         for(const item of cart.items){
//             totalAmount += item.productId.price * item.quantity 
//         }

//         console.log("Creating Razorpay order, amount:", totalAmount);

//         const order = await razorpay.orders.create({
//             amount: Math.round(totalAmount * 100),
//             currency: "INR",
//             receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`

//         })
//         console.log("Razorpay order created:", order.id); // Debug log

//         const newOrder = await Order.create({
//             userId : session.user.id,
//             items : cart.items,
//             razorpayOrderId : order.id,
//             amount : totalAmount,
//             status : "created"
//         })

//         return NextResponse.json({ 
//             success: true,
//             RazorpayOrderId: newOrder._id,
//             amount : order.amount,
//             currency : order.currency,
//             reciept : order.receipt,
//             dbOrderId : newOrder._id,
//         })

//     } catch (error) {
//         console.error("Error in /api/orders:", error);
//         return NextResponse.json({ success: false, message: "Internal Server Error (Razorpay orders)" }, { status: 500 });
//     }
// }



import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/model/Cart";
import Order from "@/model/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
    console.log("🚀 Starting POST /api/orders");
    
    try {
        // Step 1: Connect to database
        console.log("1️⃣ Connecting to database...");
        await connectToDatabase();
        console.log("✅ Database connected");

        // Step 2: Get session
        console.log("2️⃣ Getting session...");
        const session = await getServerSession(authOptions);
        console.log("📧 Session:", JSON.stringify(session, null, 2));
        
        if (!session?.user?.email) {
            console.log("❌ No session found - Unauthorized");
            return NextResponse.json({ 
                success: false, 
                message: "Unauthorized - No session" 
            }, { status: 401 });
        }
        
        console.log("👤 User ID:", session.user.id);
        console.log("📧 User Email:", session.user.email);

        // Step 3: Check Razorpay credentials
        console.log("3️⃣ Checking Razorpay credentials...");
        console.log("RAZORPAY_KEY_ID exists:", !!process.env.RAZORPAY_KEY_ID);
        console.log("RAZORPAY_KEY_SECRET exists:", !!process.env.RAZORPAY_KEY_SECRET);
        
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.log("❌ Razorpay credentials missing");
            return NextResponse.json({ 
                success: false, 
                message: "Payment gateway configuration error" 
            }, { status: 500 });
        }

        // Step 4: Initialize Razorpay
        console.log("4️⃣ Initializing Razorpay...");
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        console.log("✅ Razorpay initialized");

        // Step 5: Fetch cart
        console.log("5️⃣ Fetching cart for user:", session.user.id);
        const cart = await Cart.findOne({ userId: session.user.id })
            .populate({
                path: 'items.productId',
                select: "name price",
            })
            .lean();

        console.log("🛒 Cart found:", !!cart);
        if (!cart || Array.isArray(cart)) {
            console.log("📦 Cart items count: 0");
        } else {
            console.log("📦 Cart items count:", cart.items?.length || 0);
        }
        
        if (!cart || Array.isArray(cart) || cart.items.length === 0) {
            console.log("❌ Cart is empty or invalid");
            return NextResponse.json({ 
                success: false, 
                message: "Cart is empty" 
            }, { status: 400 });
        }

        // Step 6: Calculate total
        console.log("6️⃣ Calculating total amount...");
        let totalAmount = 0;
        
        for (const item of cart.items) {
            if (!item.productId) {
                console.error("❌ Product not found for item:", item);
                return NextResponse.json({ 
                    success: false, 
                    message: "Invalid product in cart" 
                }, { status: 400 });
            }
            console.log(`  Product: ${item.productId.name}, Price: ${item.productId.price}, Qty: ${item.quantity}`);
            totalAmount += item.productId.price * item.quantity;
        }
        
        console.log("💰 Total amount:", totalAmount);

        // Step 7: Create Razorpay order
        console.log("7️⃣ Creating Razorpay order...");
        console.log("Order details:", {
            amount: Math.round(totalAmount * 100),
            currency: "INR",
        });
        
        const order = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`
        });

        console.log("✅ Razorpay order created:", order.id);

        // Step 8: Save to database
        console.log("8️⃣ Saving order to database...");
        const newOrder = await Order.create({
            userId: session.user.id,
            items: cart.items,
            razorpayOrderId: order.id,
            amount: totalAmount,
            status: "pending"
        });

        console.log("✅ Order saved to DB:", newOrder._id);
        console.log("🎉 Success! Returning response...");

        return NextResponse.json({ 
            success: true,
            razorpayOrderId: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            dbOrderId: newOrder._id,
        });

    } catch (error: any) {
        console.error("💥 ERROR in /api/orders");
        console.error("Error name:", error?.name);
        console.error("Error message:", error?.message);
        console.error("Error stack:", error?.stack);
        console.error("Full error:", error);
        
        return NextResponse.json({ 
            success: false, 
            message: "Internal Server Error (Razorpay orders)",
            error: process.env.NODE_ENV === 'development' ? error?.message : undefined
        }, { status: 500 });
    }
}
