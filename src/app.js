import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import leadRoutes from "./routes/lead.routes.js";

import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL || "*",
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Lead Tracker API is running",
  });
});

app.use("/api/leads", leadRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
