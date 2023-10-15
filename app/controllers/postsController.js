import connect from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getUser } from "./usersController";

export const getPosts = async () => {
    const db = await connect();
    const collection = db.collection('posts');
    const postsData = await collection.find({}).toArray();
    return postsData;
}

export const getUserPosts = async (id) => {
    const db = await connect();
    const collection = db.collection('posts');

    const userId = new ObjectId(id);
    // console.log(userId)
    const currentData = await collection.find({userId: userId}).toArray();

    return currentData;
}

export const addPost = async (title, content, id, authorName) => {
    const newPost = {
        title: title,
        content: content,
        userId: new ObjectId(id),
        authorName: authorName,
    };
    // console.log(newPost)
    const db = await connect();
    const collection = db.collection('posts');

    const result = await collection.insertOne(newPost);
    if (result.acknowledged) {
        // console.log(result)
        return result;
    } else {
        return 'Error';
    }
}

export const deletePost = async ( id ) => {

    const db = await connect();
    const collection = db.collection('posts');
    const userId = new ObjectId(id);
    const result = await collection.deleteOne({_id: userId})
    if (result) {
        return result;
    } else {
        return 'Error';
    }
}