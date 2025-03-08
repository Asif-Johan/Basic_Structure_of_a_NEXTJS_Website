"use client";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";


export default function ProfilePage() {
    const router = useRouter();

    //signOut Function
    const logOut = async () => {
      try {
        const response = await axios.get("/api/users/logout");
        toast.success("Logout successful");
        router.push("/login");
        
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
        
      }
    }

    return (
        <div className="text-3xl flex flex-col items-center justify-center min-h-screen text-blue-700">
            <h1>Profile</h1>
            <h2>Profile Page</h2>
            <hr />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={logOut}>Logout</button>
        </div>
    );
}