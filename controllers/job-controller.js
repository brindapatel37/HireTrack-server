import initKnex from "knex";
// import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pkg from "validator";
const { isEmail } = pkg;
const knex = initKnex(configuration);

const getJobs = async (_req, res) => {
  const userId = req.user.id;
  try {
    const jobs = await knex("jobs").where({ user_id: userId }).select("*");
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createJob = async (req, res) => {
  const userId = req.user.id;

  const {
    company_name,
    job_title,
    job_location,
    application_date,
    job_status,
    job_description,
    recruiter_phone,
    recruiter_email,
    recruiter_name,
    salary,
    notes,
  } = req.body;

  if (!company_name || !job_title || !job_status) {
    return res.status(400).json({
      message: "Company name, job title, and job status are required fields.",
    });
  }

  if (recruiter_phone && !recruiter_phone.startsWith("+1")) {
    return res.status(400).json({
      message: "Contact phone must start with +1.",
    });
  }

  if (!isEmail(recruiter_email)) {
    return res.status(400).json({
      message: "Invalid recruiter email.",
    });
  }

  try {
    const [id] = await knex("jobs")
      .insert({
        user_id: userId,
        company_name,
        job_title,
        job_location,
        application_date,
        job_status,
        job_description,
        recruiter_phone,
        recruiter_email,
        recruiter_name,
        salary,
        notes,
      })
      .returning("id");

    const newJob = await knex("jobs").where({ id }).first();

    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating Job:", error);
    res.status(500).json({
      message: "Unable to create new Job.",
    });
  }
};

const findOneWarehouse = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehousesFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const warehouseData = warehousesFound[0];
    res.status(200).json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

export { getJobs, createJob };
