import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const knex = initKnex(configuration);

const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  console.log(username, name, password);

  const encrypted = bcrypt.hashSync(password);
  console.log(password, encrypted);

  if (!name || !username || !password === undefined) {
    return res.status(400).json({
      message: "All fields (username, name, password) are required.",
    });
  }

  try {
    await knex("users").insert({ name, username, password: encrypted });
    res.status(201).json({ success: true });
  } catch (e) {
    // switch statement! checking for error codes...
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
    // find user in db
    const user = await knex("users").where({ username }).first();

    // respond if no user
    if (!user) {
      return res.status(400).send("user incorrect");
    }

    // validate p/w
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send("password incorrect");
    }

    // generate token
    // NOTE we are encoding the user's id in the token.  we will use that when
    // we decode on line 81
    const token = jwt.sign({ id: user.id, admin: true }, process.env.SECRET);

    // respond with token
    res.json({ token });
  } catch (e) {
    res.status(401).send("login failed");
  }
};

export { createUser, fetchUser };
