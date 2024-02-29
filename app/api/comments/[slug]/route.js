import { NextResponse } from "next/server";
import { getPostComments } from "../../controllers/commenstController";

export async function GET(req, params) {
    const id = params.params.slug;

    try {
        const result = await getPostComments(id);
        if (result) {
            return NextResponse.json({ status: 'ok', comments: result });
        } 
    } catch (error) {
        console.error('Error adding user:', error);

        return NextResponse.error({ status: 'error', message: 'An error occurred' });
    }
}