import {dbConfigConnect} from "@/dbConfig/dbConfig" ;
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConfigConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({error: "Invalid credentials"}, {status: 400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //----------- Handle Token -------------//

        //create token
        const token = await jwt.sign( tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        //create response
        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        })

        //set cookie with token
        response.cookies.set("token", token, {
            httpOnly: true
        })

        //return response
        return response;
    

        // return user
        return NextResponse.json(user, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        console.log(error);
    }
}