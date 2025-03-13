"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";


export default function resetPass() {
    const router = useRouter();
  
    const [re_password, set_Re_Password] = React.useState("");
    const [user, setUser] = React.useState({

        forgotPasswordToken: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [bothPassMatch, setBothPassMatch] = React.useState(true);

    const onConfirmPass = async () => {
        try {

          if ((user.password === re_password) && (re_password !== "") && (user.email !=="")) {
            setLoading(true);
            setBothPassMatch(true);

         
            const response = await axios.post("/api/users/resetPass", user);
            // console.log("SIgnup SUccess", response.data);
            // toast.success("User logged in successfully");
          
            if (!response.data?.user) {
              toast.error(response.data?.message);
          } else {
            toast.success(response.data?.message);
            router.push("/login");
          }
           




          }else{
            setBothPassMatch(false);
          }
          

        } catch (error) {
          toast.error("Invalid credentials, check log");
            console.log(error);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(()=>{
      const urlToken = new URLSearchParams(window.location.search).get("token");
      //update user 
      console.log(urlToken);
      
      if (urlToken) {
        setUser({...user, forgotPasswordToken: urlToken});
      }

    }, [])

    useEffect(() => {
        if(user.password.length > 0 && re_password.length > 0 && user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]); 



    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800">{loading? "Processing" : "Reset Password"}</h1>
            
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
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                <input 
                  id="password"
                  type="password" 
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                <input 
                  id="re_password"
                  type="password" 
                  value={re_password}
                  onChange={(e) => set_Re_Password(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  placeholder="Re-type your password"
                  required
                />
              </div>

              {!bothPassMatch && <p className="text-red-600 text-sm text-left">Fill all fields. Enter Same Value in Both Password Fields</p>}


            
            </div>
            
            <button 
              onClick={onConfirmPass}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {buttonDisabled? "Fill Both Fields" : "Confirm Password"}
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