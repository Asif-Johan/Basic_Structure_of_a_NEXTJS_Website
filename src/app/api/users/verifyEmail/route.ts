import { dbConfigConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

dbConfigConnect();

export async function POST(request: NextRequest) {
    try {
        // Get data
        const reqBody = await request.json();
        const { verifyToken } = reqBody;

        // console.log("Request body: ", reqBody, "Token: ", verifyToken); // we have found verify token in reqBody

        // find user based on token and update isVerified to true
           //database querry and update
           const updatedUser = await User.findOneAndUpdate(
            { verifyToken,
              verifyTokenExpiry: { $gt: Date.now() }

             },
            { $set: { isVerified: true,
                verifyToken: "",
             } },
            { new: true } // Returns the updated document
          );

          console.log("Updated User: ",updatedUser);
          


        // If everything is fine, send a response
        return NextResponse.json({ message: "Token received successfully" }, { status: 200 });
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
