import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await knex("tasks").where({ user_id: userId }).select("*");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  const userId = req.user.id;
  const { task_title, duedate, task_status } = req.body;

  if (!task_title) {
    return res.status(400).json({
      message: "Task needs to be filled in prior to saving.",
    });
  }

  try {
    const [newTaskId] = await knex("tasks")
      .insert({
        user_id: userId,
        task_title,
        duedate,
        task_status,
      })
      .returning("id");

    const newTask = await knex("tasks")
      .where({ user_id: userId, id: newTaskId })
      .first();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      message: "Unable to create new task.",
    });
  }
};

const updateTask = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const { task_title, duedate, task_status } = req.body;
  const formattedDate = duedate
    ? new Date(duedate).toISOString().split("T")[0]
    : null;

  if (!task_title) {
    return res.status(400).json({
      message: "Task needs to be filled in prior to saving.",
    });
  }

  try {
    const taskExists = await knex("tasks")
      .where({ user_id: userId, id: id })
      .first();
    if (!taskExists) {
      return res.status(404).json({
        message: `task with ID ${id} not found.`,
      });
    }
    await knex("tasks").where({ user_id: userId, id }).update({
      task_title,
      duedate: formattedDate,
      task_status,
    });

    const updatedTask = await knex("tasks")
      .where({ user_id: userId, id })
      .first();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating Taks:", error);
    res.status(500).json({
      message: "Unable to update Task.",
    });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.id;

  try {
    const taskDeleted = await knex("tasks")
      .where({
        user_id: userId,
        id: req.params.id,
      })
      .delete();

    if (taskDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Task with ID ${req.params.id} not found` });
    }
    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: `Error deleting Task ${req.params.id}` });
  }
};

export { getTasks, createTask, updateTask, deleteTask };
