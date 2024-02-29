import { getUser, updateUser } from "@/app/api/controllers/usersController";
import { NextResponse } from "next/server";

export async function GET(req, params) {
    const slug = params.params.slug; 

    const data = await getUser(slug);
    
    const newData = {
        email: data.email,
        file: data.file,
        username: data.username,
        _id: data._id
    }

    return NextResponse.json(newData);
}

export async function PUT(request, params) {
    const slug = params.params.slug; 

    const { username, email, id, file} = await request.json();
    try {
        const result = await updateUser(username, email, file, slug);
        if (result) {
            return NextResponse.json({ status: 'ok', message: result });
        } 
    } catch (error) {
        // console.error('Error adding user:', error);

        return NextResponse.error({ status: 'error', message: 'An error occurred' });
    }
}