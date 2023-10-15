import { MongoClient } from 'mongodb';

const URI = process.env.MONGO_URI;
const options = {};

const client = new MongoClient(URI, options);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connect;