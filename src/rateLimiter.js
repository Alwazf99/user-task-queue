const rateLimiters = {};

const RATE_LIMITER = {
  maxTasksPerSecond: 1,
  maxTasksPerMinute: 20,
};

export const canProcessTask = (userId) => {
  if (!rateLimiters[userId]) {
    rateLimiters[userId] = {
      lastTaskTime: Date.now(),
      tasksInLastMinute: 0,
    };
    return true;
  }

  const now = Date.now();
  const timeSinceLastTask = now - rateLimiters[userId].lastTaskTime;

  if (timeSinceLastTask < 1000) return false;

  if (now - rateLimiters[userId].lastTaskTime > 60000) {
    rateLimiters[userId].tasksInLastMinute = 0;
  }

  if (
    rateLimiters[userId].tasksInLastMinute >= RATE_LIMITER.maxTasksPerMinute
  ) {
    return false;
  }

  rateLimiters[userId].lastTaskTime = now;
  rateLimiters[userId].tasksInLastMinute += 1;

  return true;
};
