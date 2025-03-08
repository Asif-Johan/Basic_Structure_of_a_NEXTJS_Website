"use client";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";



export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        _id: ""
    });
    

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

    useEffect(() => {
      async function LoadMe() {
      const response = await axios.get("/api/users/me");
      // console.log(response.data.user._id);
       setUser(
        {
          username: response.data.user.username,
          email: response.data.user.email,
          _id: response.data.user._id
        }
       );
      if(!user){
        router.push("/login");
      }

      }
  
      LoadMe()
    }, [])

    return (
        <div className="text-3xl flex flex-col items-center justify-center min-h-screen text-blue-700">
            <h1>Profile</h1>
            <h2>Profile Page</h2>
            <hr />
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <Link className="bg-green-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-2 mt-2 rounded" href={`/profile/${user._id}`}>Visit your profile</Link>

            <hr />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={logOut}>Logout</button>
        </div>
    );
}