"use client"
import Sidebar from "@/components/sidebar";
import Tiptap from "@/components/tiptap";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { redirect } from "next/navigation";
import axios from "axios"
import { useEffect, useState } from "react";
import { PiSpinnerGap } from "react-icons/pi";

export default function Home() {
  const { data: session, status } = useSession()
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)

  if (!session?.user && status === "unauthenticated") {
    redirect("/login")
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.post("/api/users/getInfoOrCreate", { user: session?.user })
      if (!data) {
        window.location.reload()
      }
      dispatch(setUser(data));
      setIsLoading(false)
    }
    if (session?.user && isLoading) {
      fetchPosts()
    }
  }, [session?.user])

  if (isLoading) {
    return (
      <div className="flex w-full h-dvh justify-center items-center bg-slate-200">
        <PiSpinnerGap className=" animate-spin text-3xl text-gray-800" />
      </div>
    );
  }

  return (
    <main className="flex w-full h-dvh bg-slate-200">
      <Sidebar />
      <Tiptap />
    </main>
  );
}
