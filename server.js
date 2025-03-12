import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

const { CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));

const PORT = process.env.PORT || 8081;

// all routes
app.use(express.json());
app.use("/user", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
