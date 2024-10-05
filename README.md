# Node.js Task Queue with Rate Limiting 🚀

A Node.js API that handles user task processing with **rate limiting** and **Redis-backed task queueing**. Each user is limited to **1 task per second** and **20 tasks per minute**. Tasks exceeding the rate limit are queued and processed later without being dropped.

## Features

- **Rate Limiting**: 1 task/second and 20 tasks/minute per user.
- **Task Queueing**: Exceeded tasks are queued in Redis.
- **Task Logging**: Logs task completions to `task-log.txt`.
- **Redis Integration**: For efficient task queue management.

## Tech Stack

- **Node.js** with Express
- **Redis** for queueing
- **Docker** (optional, for Redis)
- **Postman** (for API testing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd user-task-queue

   ```

2. Clone the repository:

   ```bash
   npm install

   ```

3. Start Redis(via Docker):

   ```bash
   docker run --name task-queue-redis -p 6379:6379 -d redis

   ```

4. Start the Node.js server:

   ```bash
   npm start

   The server will be running at http://localhost:3000.
   ```

## API Usage

# POST /task

Submit a task for a user. If the rate limit is exceeded, the task is queued.

- Request Body:

````json
{
    "user_id": "123"
}
````
- Responses:
- 200 OK: Task processed immediately.
- 202 Accepted: Task queued.

## Example Request (Postman)

- URL: http://localhost:3000/task
- Method: POST
- Body:
```json
{
    "user_id":"123"
}
```

