import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import jobRoutes from "./routes/job-routes.js";
import taskRoutes from "./routes/task-routes.js";
import resumeRoutes from "./routes/resume-routes.js";

const app = express();

app.use(
  cors({
    credentials: true, // allow credentials (tokens, cookies)
    allowedHeaders: ["Content-Type", "Authorization"], // allow authorization header
  })
);
const PORT = process.env.PORT || 8081;

// all routes
app.use(express.json());
app.use("/user", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/resume", resumeRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
