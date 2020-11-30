const { MongoClient, connect } = require("mongodb");
// Connection URI
require("dotenv/config");
const uri = process.env.DB_URI;
// Create a new MongoClient
const client = new MongoClient(uri);
let database;
async function connectToDB() {
  try {
    await client.connect();
    // Establish and verify connection
    await client.db("BooksDB").command({ ping: 1 });
    console.log("connected to DB!!");
    database = client.db("BooksDB");
  } catch {
    console.log("can't connect");
  }
}
connectToDB();
const db = () => database;
module.exports.db = db;
