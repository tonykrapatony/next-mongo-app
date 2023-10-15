import connect from "@/lib/mongodb";
import { ObjectId } from "mongodb";
const bcrypt = require('bcrypt');

export const getUsers = async () => {
    const db = await connect();
    const users = db.collection('users');
    const usersData = await users.find({}).toArray();

    return usersData;
}
export const getUser = async (id) => {
    const db = await connect();
    const collection = db.collection('users');
    const data = await collection.findOne({_id: new ObjectId(id)});
    return data;
}

export const addUser = async (username, email, file, password, callback) => {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const secretpass = await bcrypt.hash(password, salt);
    

    const newUser = {
        username: username,
        email: email,
        file: file,
        password: secretpass,
    };
    // console.log(newUser)

    const db = await connect();
    const usersCollection = db.collection('users');
    let dbuser = await usersCollection.findOne({username: username});
    let dbemail = await usersCollection.findOne({email: email});
    if (!dbuser || !dbemail) {
        const result = await usersCollection.insertOne(newUser);

        if (result) {
            // console.log('User added successfully');
            return result
        } else {
            // console.error('Failed to add user');
            return 'Failed to add user'
        }
    } else {
        return 'Such a user already exists'
    }

};

export const updateUser = async (username, email, file, id) => {

    const db = await connect();
    const usersCollection = db.collection('users');
    const result = await usersCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: { username: username, email: email, file: file }});

    if (result) {
        // console.log('result', result)
        // console.log('User updated successfully');
        return 'User updated successfully'
    } else {
        // console.error('Failed to add user');
        return 'Failed to update user'
    }

};

export const loginUser = async (email, password) => {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const secretpass = await bcrypt.hash(password, salt);

    const db = await connect();
    const usersCollection = db.collection('users');
    let user = await usersCollection.findOne({email: email});
    if (user) {

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return user;
        }
    }
}
