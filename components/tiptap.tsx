'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './toolbar'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/store/userSlice';
import { setNote } from '@/store/noteSlice';

const Tiptap = () => {
    const currentNote = useSelector((state: any) => state?.note?.currentNote!);
    const user = useSelector((state: any) => state?.user?.currentUser!);
    const dispatch = useDispatch();
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editorProps: {
            attributes: {
                class: "w-full h-[70dvh] border-2 rounded shadow-inner p-4"
            }
        },
        content: currentNote?.html ?? '',
        onUpdate: ({ editor }) => {
            // console.log(editor.getHTML())
        }
    })

    useEffect(() => {
        editor?.commands?.setContent(currentNote?.html ?? '')
    }, [currentNote])

    return (
        <div className="rounded-l-3xl bg-slate-50 w-full p-4 grid gap-4">
            {currentNote && (
                <>
                    <Toolbar editor={editor!} />
                    <EditorContent editor={editor} />

                    <div className="w-full flex justify-end items-center gap-4">
                        <Button
                            variant="destructive"
                            onClick={() => {
                                toast.promise(
                                    axios.put("/api/notes/delete", {
                                        email: user?.email,
                                        noteId: currentNote?.id,
                                    }),
                                    {
                                        loading: "Deleting note",
                                        success: (data: any) => {
                                            dispatch(setNote(null))
                                            dispatch(setUser(data?.data));
                                            return `note has been deleted`;
                                        },
                                        error: "something went wrong",
                                    }
                                );
                            }}
                        >
                            Delete
                        </Button>

                        <Button
                            onClick={() => {
                                toast.promise(
                                    axios.put("/api/notes/update", {
                                        email: user?.email,
                                        note: {
                                            id: currentNote?.id,
                                            html: editor?.getHTML(),
                                            date: new Date(),
                                        },
                                    }),
                                    {
                                        loading: "Update note",
                                        success: (data: any) => {
                                            dispatch(setUser(data?.data));
                                            return `note has been updated`;
                                        },
                                        error: "something went wrong",
                                    }
                                );
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </>
            )}
            {!currentNote && (
                <div className="h-full flex flex-col justify-center items-center">
                    <p className="font-semibold text-xl"> Welcome to Notes</p>
                    <p>Select a note to start editing</p>
                </div>
            )}
        </div>
    );
}

export default Tiptap