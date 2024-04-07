import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/Users";
import { v4 as uuid } from "uuid"

export const PUT = async (req: NextRequest) => {
    try {
        await connect();
        const { email, noteId } = await req.json();

        await User.updateOne(
            { email },
            { $pull: { notes: { id: noteId } } }
        );

        const updatedUser = await User.findOne({ email })

        return new NextResponse(JSON.stringify(updatedUser))
    }
    catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify("something went wrong"), { status: 500 })
    }
};