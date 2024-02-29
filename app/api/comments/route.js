import { NextResponse } from "next/server";
import { addComment } from "../controllers/commenstController";

export async function POST(request) {
    const { content, id, authorName } = await request.json();
    console.log({ content, id, authorName })

    try {
        // console.log('title, content, id, authorName', title, content, id, authorName)
        const result = await addComment(content, id, authorName);
        // console.log('result', result)

        if (result.insertedId) {
            return NextResponse.json({ status: 'ok', message: 'Comment added successfully' });
        } else {
            return NextResponse.error({ status: 'error', message: 'Failed to add comment' });
        }

    } catch (error) {
        // console.error('Error adding user:', error);
        return NextResponse.error({ status: 'error', message: 'An error occurred' });
    }
}