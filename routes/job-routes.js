import express from "express";
import * as jobController from "../controllers/job-controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, jobController.getJobs)
  .post(authenticate, jobController.createJob);

router
  .route("/:id")
  .get(authenticate, jobController.getOneJob)
  .put(authenticate, jobController.updateJob)
  .delete(authenticate, jobController.deleteJob);

export default router;

// • POST /users/register: Create a new user account
// • POST /users/login: User login with OAuth
// • GET /jobs: Get a list of job applications for the logged-in user
// • POST /jobs: Add a new job application
// • PUT /jobs/:id: Update job application details
// • DELETE /jobs/:id: Delete a job application
// • POST /resume: Parse uploaded resume to get feedback on resume based on job description
// • POST /tasks: add a new task
// - GET /tasks: get a list of all tasks
// - PUT /tasks/:id : edit a task
// - DELETE /tasks/:id : Delete a task

// Login/Sign Up: User authentication screens
//     • Home/Main page: Job tracking list with categorized statuses and count of jobs. CRUD operations. Side panel for to-dos (accessible on every authenticated page). Joke generator
//     • Job Details: A page showing full details of a job application, including recruiter contact info and follow-up dates. Side panel for to-dos (accessible on every authenticated page).
//     • Dashboard (maybe - time dependent): Job list with categorized statuses (Wishlist, Applied, Interviewing, Offer, Rejected). Side panel for to-dos (accessible on every authenticated page).
//     • Resume Feedback: Page for users to input text resumes and the job application details and get feedback on them.
