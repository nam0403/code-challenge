import express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import usersRouter from "./routes/users";
import { errorHandler } from "./utils/errorHandler";

const PORT = process.env.PORT || 3000;

async function main() {
  await AppDataSource.initialize();
  console.log("✅ Database connected");

  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Express + TypeScript User API", uptime: process.uptime() });
  });

  app.use("/users", usersRouter);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
