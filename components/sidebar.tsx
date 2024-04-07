"use client"
import { extractText } from '@/lib/utils';
import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setNote } from '@/store/noteSlice';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { setUser } from '@/store/userSlice';
import { toast } from 'sonner';

type Note = {
    html: string,
    id: string,
    date: Date
}

const Sidebar = () => {
    const user = useSelector((state: any) => state?.user?.currentUser!);
    const currentNote = useSelector((state: any) => state?.note?.currentNote!);
    const dispatch = useDispatch();

    return (
        <div className="p-8 w-64 h-dvh relative">
            <h1 className="text-xl font-bold pb-8">Notes</h1>
            <Button
                variant="secondary"
                className=" w-full border-2 bg-slate-50 mb-8 border-gray-600"
                onClick={async () => {
                    toast.promise(axios.post("/api/notes/create", { email: user?.email }), {
                        loading: 'Adding new Note',
                        success: (data: any) => {
                            dispatch(setUser(data?.data))
                            return `new note has been added`;
                        },
                        error: 'something went wrong',
                    });
                }}
            >
                Add note
            </Button>
            <ul className="h-[50dvh] flex flex-col gap-2 overflow-y-scroll">
                {user?.notes?.map((note: Note) => {
                    const text = extractText(note.html);
                    return (
                        <li
                            className={`${currentNote?.id === note?.id ? "border-2 border-gray-600" : ""} p-3 bg-slate-100 min-h-12 rounded-md truncate`}
                            onClick={() => {
                                dispatch(setNote(note));
                            }}
                        >
                            {text}
                        </li>
                    );
                })}
            </ul>
            <div className="flex justify-between gap-8 absolute bottom-4 left-4">
                <Avatar>
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button onClick={() => { signOut() }}>Logout</Button>
            </div>
        </div>
    );
}

export default Sidebar