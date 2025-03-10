"use client"
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import React , { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", { token });
            toast.success(response.data.message);
            setVerified(true);
         
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
            toast.error(error.response.data.message);
        }
    };


   
    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        if (urlToken) setToken(urlToken);
    }, []);
    
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2 className="text-2xl font-bold">Verify Email</h2>
            <h3>{token? `${token}` : "No token found"}</h3>

            {verified && (
                <div>
                    <h2 className="text-2xl font-bold">Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl font-bold">Error</h2>
                </div>
            )}
        </div>
    );
}
