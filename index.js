const express = require("express");
const { PrismaClient: PrismaClient1 } = require("./prisma/generated/shard1");
const { PrismaClient: PrismaClient2 } = require("./prisma/generated/shard2");
const { PrismaClient: PrismaClient3 } = require("./prisma/generated/shard3");

const app = express();
app.use(express.json());

const shard1 = new PrismaClient1();
const shard2 = new PrismaClient2();
const shard3 = new PrismaClient3();

const shards = [shard1, shard2, shard3];

// Hash function to determine the shard
const getShard = (userId) => {
  const shardIndex = userId % shards.length;
  return shards[shardIndex];
};

// Create User
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const userId = Math.floor(Math.random() * 10000);

  const db = getShard(userId);
  const user = await db.user.create({ data: { id: userId, name, email } });

  res.json({ message: "User Created", user });
});

// Get User
app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const db = getShard(userId);

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

app.listen(3000, () => console.log("Server running on port 3000"));
