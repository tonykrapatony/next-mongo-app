import connect from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const getPostComments = async (id) => {
    const db = await connect();
    const collection = db.collection('comments');

    const posts = await collection.find({postId: new ObjectId(id)}).toArray();
    return posts;
}

export const addComment = async (content, id, authorName) => {
    const newComment = {
        content: content,
        postId: new ObjectId(id),
        authorName: authorName,
    };
    // console.log(newPost)
    const db = await connect();
    const collection = db.collection('comments');

    const result = await collection.insertOne(newComment);
    if (result.acknowledged) {
        // console.log(result)
        return result;
    } else {
        return 'Error';
    }
}