import express from "express";
import { addTaskToQueue, processQueue } from "./queue.js";
import { canProcessTask } from "./rateLimiter.js";
import { appendFile } from "fs/promises";

const app = express();
app.use(express.json());

const task = async (userId) => {
  const logMessage = `${userId} - task completed at ${Date.now()}\n`;
  try {
    await appendFile("./logs/task-log.txt", logMessage);
  } catch (err) {
    console.error("Error writing to log files", err);
  }
};

app.post("/task", async (req, res) => {
  const { user_id: userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (canProcessTask(userId)) {
    await task(userId);
    return res.status(200).json({ message: "Task processed immediately!" });
  }

  addTaskToQueue(userId, { userId });
  return res.status(200).json({ message: "Task Queued!" });

  setTimeout(() => {
    processQueue(userId, async (queuedTask) => {
      await task(queuedTask.userId);
    });
  }, 1000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
