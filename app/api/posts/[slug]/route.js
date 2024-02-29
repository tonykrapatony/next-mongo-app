import { deletePost, getUserPosts, updatePost } from "@/app/api/controllers/postsController";
import { NextResponse } from "next/server";

export async function GET(req, params) {
    const id = params.params.slug;
    const data = await getUserPosts(id);

    return NextResponse.json(data);
}

export async function PUT(request, params) {
    const slug = params.params.slug; 
    console.log(slug);

    const { postContent } = await request.json();
    console.log(postContent);

    try {
        const result = await updatePost(slug, postContent);
        if (result) {
            return NextResponse.json({ status: 'ok', message: result });
        } 
    } catch (error) {
        // console.error('Error adding user:', error);

        return NextResponse.error({ status: 'error', message: 'An error occurred' });
    }
}

export async function DELETE(req, params) {
    const id = params.params.slug;
    // console.log(id)
    const data = await deletePost(id);

    return NextResponse.json({ status: 'ok', message: 'Post deleted successfully' });
}