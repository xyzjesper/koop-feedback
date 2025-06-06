"use server"

import { connectToDatabase } from "@/backend/database";
import { sessionDB } from "@/backend/schemas/sessionDB";
import { userDB } from "@/backend/schemas/userDB";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { uuid } from "short-uuid";

export async function POST(req: NextRequest) {

    await connectToDatabase();



    const cookie = await cookies()

    await userDB.deleteMany({
        SessionId: cookie.get("sessionId")?.value,
        AuthId: cookie.get("authId")?.value,
        UserId: cookie.get("userId")?.value,
    })

    cookie.delete("sessionId")
    cookie.delete("userId")
    cookie.delete("authId")

    return NextResponse.redirect(new URL("/", req.url))
}