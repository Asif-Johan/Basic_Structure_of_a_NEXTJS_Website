import { dbConfigConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


dbConfigConnect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        // console.log(reqBody);

        //find user
        const user = await User.findOne({ verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
         });
        //  console.log("User found:", user);
        if (!user) {
            return NextResponse.json({
                error: "User not found"
            })
        }

        //update user
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        console.log("User updated and saved:", user);


        return NextResponse.json({
            message: "Email Verified Successfully",
            success: true,
            user: user
        })

        


        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        })
    }

}