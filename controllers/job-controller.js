import initKnex from "knex";
import configuration from "../knexfile.js";
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

const getOneJob = async (_req, res) => {
  const userId = req.user.id;
  try {
    const jobFound = await knex("jobs")
      .where({ user_id: userId, id: req.params.id })
      .select("*");

    if (jobFound.length === 0) {
      return res.status(404).json({
        message: `Job with ID ${req.params.id} not found`,
      });
    }

    const jobData = jobFound[0];
    res.status(200).json(jobData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve job  data for job with ID ${req.params.id}`,
    });
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

  if (recruiter_email && !isEmail(recruiter_email)) {
    return res.status(400).json({
      message: "Invalid recruiter email.",
    });
  }

  try {
    const [newJobId] = await knex("jobs")
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

    const newJob = await knex("jobs")
      .where({ user_id: userId, id: newJobId })
      .first();

    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating Job:", error);
    res.status(500).json({
      message: "Unable to create new Job.",
    });
  }
};

const updateJob = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

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

  if (recruiter_email && !isEmail(recruiter_email)) {
    return res.status(400).json({
      message: "Invalid recruiter email.",
    });
  }

  try {
    const jobExists = await knex("jobs")
      .where({ user_id: userId, id: id })
      .first();
    if (!jobExists) {
      return res.status(404).json({
        message: `Job with ID ${id} not found.`,
      });
    }
    await knex("jobs").where({ user_id: userId, id }).update({
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
    });

    const updatedJob = await knex("jobs")
      .where({ user_id: userId, id })
      .first();

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating Job:", error);
    res.status(500).json({
      message: "Unable to update Job.",
    });
  }
};

const deleteJob = async (req, res) => {
  const userId = req.user.id;

  try {
    const jobDeleted = await knex("jobs")
      .where({
        user_id: userId,
        id: req.params.id,
      })
      .delete();

    if (jobDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Job with ID ${req.params.id} not found` });
    }
    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: `Error deleting Job ${req.params.id}` });
  }
};

export { getJobs, getOneJob, createJob, updateJob, deleteJob };
