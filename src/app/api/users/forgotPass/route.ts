import { dbConfigConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


//connect to database
dbConfigConnect();

//bring in data using NextRequest
export async function POST(request: NextRequest) {

    try {
        //get data
        const reqBody = await request.json();
        //get email (destructure)
        const {email} = reqBody;
                                                   // console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email});
                                                  // console.log(user);
        
        //IF user don't exist
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //if user exists, then send email
        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        });
        return NextResponse.json({message: "Mail Sent"}, {status: 200})

        

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            error: error
        })
        
    }
}