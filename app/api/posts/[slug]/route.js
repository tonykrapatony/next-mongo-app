import { deletePost, getUserPosts } from "@/app/controllers/postsController";
import { NextResponse } from "next/server";

export async function GET(req, params) {
    const id = params.params.slug;
    const data = await getUserPosts(id);

    return NextResponse.json(data);
}

export async function DELETE(req, params) {
    const id = params.params.slug;
    // console.log(id)
    const data = await deletePost(id);

    return NextResponse.json({ status: 'ok', message: 'Post deleted successfully' });
}