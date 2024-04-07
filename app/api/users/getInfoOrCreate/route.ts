import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/Users";
import { v4 as uuid } from "uuid"

export const POST = async (req: NextRequest) => {
    try {
        await connect();
        const { user } = await req.json();
        const existingUser = await User.findOne({ email: user.email });

        if (user && !existingUser) {
            const createUser = new User({
                name: user?.name,
                email: user?.email,
                image: user?.image,
                notes: [
                    {
                        id: uuid(),
                        html: "<p>Your First Note</p>",
                        date: new Date(),
                    },
                ],
            });
            await createUser.save();
            return new NextResponse(JSON.stringify(createUser));
        } else {
            return new NextResponse(JSON.stringify(existingUser));
        }
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(null));
    }

};