import { getUser, updateUser } from "@/app/controllers/usersController";
import { NextResponse } from "next/server";

export async function GET(req, params) {
    const slug = params.params.slug; 
    console.log('slug', slug)

    const data = await getUser(slug);

    return NextResponse.json(data);
}

export async function PUT(request, params) {
    const slug = params.params.slug; 
    console.log('slug', slug);
    console.log('request', request);

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