import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis error", err);
});

export const addTaskToQueue = (userId, taskData) => {
  const taskKey = `queue:${userId}`;
  redisClient.rPush(taskKey, JSON.stringify(taskData));
};

export const processQueue = (userId, processTaskCallback) => {
  const taskKey = `queue:${userId}`;
  redisClient.lPop(taskKey, (err, task) => {
    if (task) {
      processTaskCallback(JSON.parse(task));
    }
  });
};
