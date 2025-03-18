import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";

const knex = initKnex(configuration);

const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  console.log(username, name, password);

  if (!name || !username || !password) {
    return res.status(400).json({
      message: "All fields (username, name, password) are required.",
    });
  }

  try {
    // Save password as plain text (not recommended for production)
    await knex("users").insert({ name, username, password });
    res.status(201).json({ success: true });
  } catch (e) {
    switch (e.code) {
      case "ER_DUP_ENTRY":
        res.status(400).send("username exists");
        break;
      case "ER_DATA_TOO_LONG":
        res.status(400).send("username too long (max 20 chars)");
        break;
      default:
        res.status(500).send("something went wrong");
    }
  }
};

const fetchUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("users").where({ username }).first();

    if (!user) {
      return res.status(400).send("user incorrect");
    }

    // Compare plain text password directly
    if (password !== user.password) {
      return res.status(400).send("password incorrect");
    }

    // Generate token if password matches
    const token = jwt.sign({ id: user.id, admin: true }, process.env.SECRET);

    res.json({ token });
  } catch (e) {
    res.status(401).send("login failed");
  }
};

export { createUser, fetchUser };
