//backup
import { dbConfigConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcrypt from "bcryptjs";


//connect to database
dbConfigConnect();

export async function POST(request: NextRequest) {
    try {
        //get data
        const reqBody = await request.json();
        //get email (destructure)
        const {
            forgotPasswordToken,
            email,
            password} = reqBody;
console.log("Request body: ", reqBody);


            

        
if (!forgotPasswordToken || !email || !password) {
    return NextResponse.json({
        message: "Unauthorized or invalid request",
        status: 400
    })
    
}
       
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //database querry and update
             const updatedUser = await User.findOneAndUpdate(
            { email,
              forgotPasswordToken,
              forgotPasswordTokenExpiry: { $gt: Date.now() }

             },
            { $set: { password: hashedPassword,
                forgotPasswordToken: "",
             } },
            { new: true } // Returns the updated document
          );
        //   console.log("updated user", updatedUser);
        
       

        
       if(updatedUser){

        return NextResponse.json({
            message: "Password reset successfully",
            success: true,
            user: updatedUser
        })
       }else{
        return NextResponse.json({
            message: "You don't have authorization to reset password",
            status: 400,
            user: updatedUser
        })
    }


                                      
        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 400
        })
    }
}
