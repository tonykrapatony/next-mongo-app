import { addUser, getUsers } from "@/app/api/controllers/usersController";
import { NextResponse } from "next/server";

export async function GET(request) {
    const data = await getUsers(request);

    return NextResponse.json(data);
}

export async function POST(request) {
    const { username, email, file, password } = await request.json();
    try {
        const result = await addUser(username, email, file, password);
        if (typeof result === 'string' && result === 'Such a user already exists') {
            return NextResponse.json({ status: 'error', message: result });
        } else {
            return NextResponse.json({ status: 'ok', message: 'User added successfully' });
        }
    } catch (error) {
        // console.error('Error adding user:', error);
        return NextResponse.error({ status: 'error', message: 'An error occurred' });
    }
}