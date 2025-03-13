"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";


export default function ForgotPass() {
    const router = useRouter();
  
    const [user, setUser] = React.useState({
        email: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onClick = async () => {
        try {
          setLoading(true);

            const response = await axios.post("/api/users/forgotPass", user);
            router.push("/");
            // console.log("SIgnup SUccess", response.data);
            // toast.success("User logged in successfully");
            // router.push("/profile");

            // console.log(response.data);
        } catch (error) {
            toast.custom(
            <div className=" bg-gray-800 text-white">📩 Email will be sent if user exists.
             <div className="mt-2 text-2xl">Check Mail!</div>
             </div>);
          
            console.log(error);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        if(user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);



    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800">{loading? "Processing" : "Forgot Password?"}</h1>
            
            <div className="space-y-4">
              
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              
            </div>
            
            <button 
              onClick={onClick}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {buttonDisabled? "Enter Email to Reset" : "Get Reset Link"}
            </button>
            
            <div className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      );
}