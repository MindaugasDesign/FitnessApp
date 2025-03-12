import express from "express";
import cors from "cors";
import dayjs from "dayjs";
import Joi from "joi";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@duomenubaze.e17x3.mongodb.net/?retryWrites=true&w=majority&appName=Duomenubaze`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db, usersCollection, logsCollection, goalsCollection;

async function initializeMongo() {
  try {
    await client.connect();
    db = client.db("FitnessApp");
    usersCollection = db.collection("Users");
    logsCollection = db.collection("Logs");
    goalsCollection = db.collection("Goals");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

initializeMongo();

//Home
app.get("/", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const oneUser = req.params.id;
    const users = await usersCollection.findOne({ _id: new ObjectId(oneUser) });
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/:id", async (req, res) => {
  const { name, age, email, weight, height, dateCreated } = req.body;
  try {
    const updatedUser = {
      name,
      age,
      email,
      weight,
      height,
      dateCreated,
    };
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedUser }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const objectId = new ObjectId(userId);
    await logsCollection.deleteOne({ userId: objectId });
    await goalsCollection.deleteOne({ userId: objectId });
    const result = await usersCollection.deleteOne({ _id: objectId });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/userlog/:id", async (req, res) => {
  const sentUser = req.params.id;
  const specificUser = await usersCollection.findOne({
    _id: new ObjectId(sentUser),
  });

  res.send(specificUser);
});

app.get("/userlogs/:id", async (req, res) => {
  const user = req.params.id;
  const foundUser = await logsCollection.findOne({
    userId: new ObjectId(user),
  });
  res.send(foundUser);
});

app.get("/usergoalforlog/:id", async (req, res) => {
  const goalId = req.params.id;
  const foundGoal = await goalsCollection.findOne({
    "goals.goalId": new ObjectId(goalId),
  });
  res.json(foundGoal);
});

app.get("/usergoal/:id", async (req, res) => {
  const sentUser = req.params.id;
  const specificUser = await usersCollection.findOne({
    _id: new ObjectId(sentUser),
  });

  res.send(specificUser);
});

app.get("/usergoals/:id", async (req, res) => {
  const sentUser = req.params.id;
  const specificGoals = await goalsCollection.findOne({
    userId: new ObjectId(sentUser),
  });
  res.send(specificGoals);
});

app.get("/usergoallogs/:id", async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const userLogs = await goalsCollection
      .aggregate([
        {
          $match: { userId },
        },
        {
          $unwind: "$goals",
        },
        {
          $lookup: {
            from: "Logs",
            localField: "selectedGoalId",
            foreignField: "goalId",
            as: "logs",
          },
        },
        {
          $project: {
            _id: 0,
            goalId: "$goals.goalId",
            logs: { $ifNull: ["$logs", []] },
          },
        },
      ])
      .toArray();

    res.json(userLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addnewuser", async (req, res) => {
  const userSchema = Joi.object({
    dateCreated: Joi.date().required(),
    name: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(0).max(80).required(),
    weight: Joi.number().positive().max(500).required(),
    height: Joi.number().positive().max(250).required(),
  });

  try {
    const newUser = req.body;
    const validUser = userSchema.validate(newUser);
    let userResult;

    if (!validUser) {
      console.log(
        "Validation Error:",
        error.details.map((detail) => detail.message)
      );
      return;
    } else {
      userResult = await usersCollection.insertOne(newUser);
      const logEntry = {
        userId: userResult.insertedId,
        logs: [],
      };

      const userGoal = {
        userId: userResult.insertedId,
        goals: [],
      };
      await logsCollection.insertOne(logEntry);
      await goalsCollection.insertOne(userGoal);
      return res.status(201).send({
        userId: userResult.insertedId,
        message: "User created and log added",
      });
    }
  } catch (error) {
    console.error("Error adding new user and log:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/addnewlog", async (req, res) => {
  try {
    const { userId, goal, logName, logDesc, logDate } = req.body;
    if (!userId || !goal || !logName || !logDesc || !logDate) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const logData = {
      selectedGoalId: new ObjectId(goal),
      logName: logName,
      logDesc: logDesc,
      logDate: logDate,
    };

    const result = await logsCollection.updateOne(
      { userId: new ObjectId(userId) },
      { $push: { logs: logData } },
      { upsert: true }
    );

    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      res.status(201).send({ message: "Log added successfully!", logData });
    } else {
      res.status(500).send({ error: "Failed to add a log" });
    }
  } catch (error) {
    console.error("Error adding lgo:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/addgoal", async (req, res) => {
  try {
    const { userId, goalName, goalStartDate, goalDuration } = req.body;
    if (!userId || !goalName || !goalStartDate || !goalDuration) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const startDate = new Date(goalStartDate);
    let endDate = new Date(startDate);
    switch (goalDuration) {
      case "1day":
        endDate = dayjs(startDate).add(1, "day").toDate();
        break;
      case "1week":
        endDate = dayjs(startDate).add(1, "week").toDate();
        break;
      case "1month":
        endDate = dayjs(startDate).add(1, "month").toDate();
        break;
      case "1year":
        endDate = dayjs(startDate).add(1, "year").toDate();
        break;
      default:
        return res.status(400).send({ error: "Invalid duration" });
    }
    const goalData = {
      goalId: new ObjectId(),
      goalName,
      startDate,
      endDate,
    };
    const result = await goalsCollection.updateOne(
      { userId: new ObjectId(userId) },
      { $push: { goals: goalData } },
      { upsert: true }
    );
    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      res.status(201).send({ message: "Goal added successfully!", goalData });
    } else {
      res.status(500).send({ error: "Failed to add goal" });
    }
  } catch (error) {
    console.error("Error adding goal:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
