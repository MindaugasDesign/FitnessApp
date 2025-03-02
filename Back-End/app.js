import express from "express";
import cors from "cors";
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://rasimaviciusmindaugas:Mindelis.123@duomenubaze.e17x3.mongodb.net/?retryWrites=true&w=majority&appName=Duomenubaze";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let usersCollection;
let logsCollection;

async function initializeMongo() {
  try {
    await client.connect();
    db = client.db("FitnessApp");
    usersCollection = db.collection("Users");
    logsCollection = db.collection("Logs");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

initializeMongo();

app.get("/", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/userlog/:id", async (req, res) => {
  const sentUser = req.params.id;
  const specificUser = await usersCollection.findOne({
    _id: new ObjectId(sentUser),
  });

  res.send(specificUser);
});

app.post("/addnewuser", async (req, res) => {
  try {
    const newUser = req.body;

    // Insert user into the users collection
    const userResult = await usersCollection.insertOne(newUser);

    if (!userResult.acknowledged) {
      return res.status(500).send({ error: "Failed to create user" });
    }

    // Create a log entry for the new user
    const logEntry = {
      userId: userResult.insertedId, // Associate log with user ID
      logs: [],
    };

    await logsCollection.insertOne(logEntry);

    return res.status(201).send({
      userId: userResult.insertedId,
      message: "User created and log added",
    });
  } catch (error) {
    console.error("Error adding new user and log:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
