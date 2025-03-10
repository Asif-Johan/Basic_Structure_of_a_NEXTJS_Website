import {dbConfigConnect} from "@/dbConfig/dbConfig" ;
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConfigConnect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create and save a user in the database
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        
        const savedUser = await newUser.save();
        console.log(savedUser);
        
        //send Email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, {
            status: 201
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}