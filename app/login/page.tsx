"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const Page = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.push("/")
        }
    }, [session]);

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-cover">
            <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-white pt-40 text-center dark:bg-darkTheme dark:text-white sm:mx-20 sm:h-80 sm:rounded-2xl sm:pt-0 md:mx-40 xl:mx-60 2xl:mx-96">
                <h1 className=" text-3xl">Welcome!!</h1>
                <p className=" mx-4">
                    Every Login, a New Beginning
                </p>
                <button
                    className=" flex items-center gap-2 rounded-md border-2 bg-slate-100 p-2 font-bold shadow"
                    onClick={() => signIn("google")}
                >
                    <FcGoogle />
                    Login with Google
                </button>
            </div>
        </div>
    );
};
export default Page;