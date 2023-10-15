import { addPost, getPosts } from "@/app/controllers/postsController";
import { NextResponse } from "next/server";

export async function GET(req, params) {
    const data = await getPosts();

    return NextResponse.json(data);
}

export async function POST(request) {
    const { title, content, id, authorName } = await request.json();

    try {
        // console.log('title, content, id, authorName', title, content, id, authorName)
        const result = await addPost(title, content, id, authorName);
        // console.log('result', result)

        if (result.insertedId) {
            // Пост успішно додано
            return NextResponse.json({ status: 'ok', message: 'Post added successfully' });
        } else {
            // Якщо не вдалося вставити пост
            return NextResponse.error({ status: 'error', message: 'Failed to add post' });
        }

    } catch (error) {
        // console.error('Error adding user:', error);

        // Встановлюємо статус "error" у разі помилки
        return NextResponse.error({ status: 'error', message: 'An error occurred' });
    }
}