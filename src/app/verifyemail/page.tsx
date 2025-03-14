"use client"
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import React , { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
const router = useRouter();
const [verifyToken, setVerifyToken] = useState("kk");


//function to verify user
const verifyUser = async () => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log("front end: form url: ",urlToken);

    try {
        const response = await axios.post("/api/users/verifyEmail", {verifyToken: urlToken});
        console.log("VErify SuCCess", response.data);
        toast.success("User Verified");
        router.push("/login");

        console.log(response.data);
    } catch (error) {
        toast.error("Invalid credentials");
        console.log(error);
    }


  }

   

    return (
        <div className="text-3xl flex flex-col items-center justify-center min-h-screen text-blue-700">
            <h1>Click to verify email</h1>
            <button onClick={verifyUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-md mt-2 py-1 px-4 rounded">Verify</button>

        </div>
    )
}
