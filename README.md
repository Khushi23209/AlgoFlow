# AlgoFlow

**Write real algorithms. Watch them actually run. Learn from an AI that's grounded in the real execution — not a chatbot guessing.**

AlgoFlow is a full-stack platform where users write their own sorting/searching algorithms in a real code editor, submit them, and watch the *actual* execution — step by step — inside a safe, sandboxed environment. It's not a canned animation of "how bubble sort works" — it's your code, actually running, actually traced, actually visualized.

> A live demo video is coming soon.

---

## Why this project exists

Most algorithm visualizers show you a fixed, pre-baked animation of "how bubble sort works." AlgoFlow is different: **you write the code, and it visualizes what your code actually does** — including when your code is wrong. Sort is broken? You'll see it fail, visually, step by step, instead of just getting a red "Wrong Answer."

This meant solving a genuinely hard problem: how do you safely run arbitrary, untrusted, user-submitted code, and extract a meaningful step-by-step trace from it — without asking the user to write any tracing code themselves?

---

## What it does

- **Write code in a real editor** (Monaco — the engine behind VS Code) for Bubble Sort, Binary Search, or Selection Sort
- **Submit and watch it execute** inside an isolated Docker sandbox — with CPU/memory limits and execution timeouts, since this runs arbitrary user code
- **Step through the real execution**, one operation at a time, with a purpose-built visualizer per algorithm (array boxes for sorting, a shrinking search range for binary search)
- **Ask the AI to explain any step** — grounded in your actual code and the actual trace data, not a generic "here's how bubble sort works" answer
- **Take an AI-generated quiz** — 10 fresh, conceptual multiple-choice questions generated on the fly from your specific code and algorithm, never the same quiz twice
- **Sign up, log in, and submit securely** — JWT-based auth, hashed passwords, protected routes

---

## Architecture

```
┌──────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   React SPA   │─────▶│   Express API     │─────▶│   PostgreSQL     │
│ (Monaco editor,│      │ (auth, submissions,│      │ (users, problems,│
│  visualizers)  │      │  AI routes)        │      │  submissions)    │
└──────────────┘      └────────┬─────────┘      └─────────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │  Docker Sandbox   │
                       │  (isolated code   │
                       │   execution)      │
                       └──────────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │  Gemini API       │
                       │  (AI explain +    │
                       │   quiz generation)│
                       └──────────────────┘
```

### The interesting engineering problem: tracing arbitrary user code

Getting a meaningful execution trace out of code the user writes themselves — without them writing any tracing logic — was the core technical challenge. The solution: each problem provides small, purpose-built **helper functions** (e.g. `compare()` / `swap()` for Bubble Sort, `checkMid()` for Binary Search) that the user calls as part of writing natural algorithm logic. These helpers do the real work *and* silently record a structured trace step behind the scenes — no `console.log`, no manual instrumentation, no visible tracing code in the user's editor.

```js
// What the user actually writes — completely normal-looking code:
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const { mid, result, low: newLow, high: newHigh } = checkMid(arr, low, high, target);
    if (result === "found") return mid;
    low = newLow; high = newHigh;
  }
  return -1;
}
```

The `checkMid` function is hidden from the editor, combined with the user's code only at submission time, and produces a clean, semantic trace (`check-mid`, `narrow-left`, `narrow-right`, `found`) — richer than naive instrumentation, and completely invisible to the person solving the problem.

### Sandboxed execution

User code is written to a temp file, mounted into a custom-built, minimal Docker image (`node:22-alpine`), and executed with:
- **Resource limits**: `--memory=50m`, `--cpus=0.5`
- **Timeout enforcement**: containers are force-killed via `docker kill` if execution exceeds 5 seconds (with a separate check to guarantee the *container* — not just the local process — actually stops)
- **Auto-cleanup**: `--rm` ensures no orphaned containers accumulate

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, Monaco Editor |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Sandboxing | Docker |
| Auth | Passport.js (JWT + Local strategies), bcrypt |
| AI | Google Gemini API |

---

## Getting started locally

### Prerequisites
- Node.js 18+
- PostgreSQL
- Docker Desktop (running)
- A Gemini API key ([Google AI Studio](https://aistudio.google.com))

### 1. Clone and install
```bash
git clone https://github.com/Khushi23209/AlgoFlow.git
cd AlgoFlow

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

> **Note:** replace `server` and `client` above with your actual folder names if they differ.

### 2. Set up the database
```bash
createdb algoflow
psql algoflow < server/schema.sql
```

### 3. Environment variables

`server/.env`:
```
PORT=8000
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=algoflow
JWT_SECRET=some_long_random_string
GEMINI_API_KEY=your_gemini_key
```

### 4. Build the sandbox image
```bash
cd server/docker
docker build -t code-runner .
```

### 5. Run it
```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Visit `http://localhost:5173`.

---

## Deployment status

Not yet live. The sandboxing architecture requires spawning sibling Docker containers from the backend process — a capability most managed platforms (Railway, Render, Vercel) intentionally restrict for security reasons. A proper deployment needs a real VM (e.g. AWS EC2, Oracle Cloud) with Docker installed directly. This is planned as a follow-up once I've built out that infrastructure knowledge properly, rather than rushing it.

---

## What I'd build next

- Deploy to a real VM with Docker access
- Add more algorithms (BFS/DFS would need a graph-based visualizer, a different rendering model from the array-box approach used here)
- Move code execution off the request thread into a background job queue (Redis + BullMQ) for better concurrency under load
- WebSocket-based live streaming of AI responses, token by token

---

## Author

Khushi Goyal — CS student, Bennett University
[GitHub](https://github.com/Khushi23209)