# Production-Grade Express Node.js REST API

A modern, scalable, production-ready Node.js REST API backend template built with Express, TypeScript, Zod schema validation, Pino structured logging, Helmet security headers, rate limiting, and Vitest testing framework following industry best practices.

---

## 🚀 Key Features & Best Practices

- **TypeScript Standard**: Type safety, auto-completion, compile-time error detection.
- **Layered Architecture**: Strict separation of concerns (`Routes` ➔ `Middlewares` ➔ `Controllers` ➔ `Services` ➔ `Data Layer`).
- **Robust Centralized Error Handling**: Custom `AppError` operational error hierarchy and global error handler middleware.
- **Security & Protection**:
  - `Helmet` for secure HTTP headers (XSS, HSTS, Sniff protection)
  - `CORS` configuration for cross-origin request policies
  - `express-rate-limit` for DDoS / brute-force protection
  - Input payload size limits & Gzip compression
- **Input Validation**: `Zod` schema validation middleware for body, query params, and URL path parameters.
- **Structured Logging**: High-performance `Pino` logger with colorized human-readable development output (`pino-pretty`) and JSON in production.
- **Interactive Documentation**: Swagger / OpenAPI 3.0 documentation served dynamically at `/api-docs`.
- **Graceful Shutdown**: Listens for process signals (`SIGINT`, `SIGTERM`), closes server connections cleanly, and handles uncaught exceptions/rejections.
- **Unit & Integration Testing**: Modern, ultra-fast test suite with `Vitest` and `Supertest`.

---

## 📁 Directory Architecture

```
my-portfolio/
├── src/
│   ├── config/
│   │   ├── env.ts          # Zod-validated environment config
│   │   └── logger.ts       # Pino structured logger instance
│   ├── controllers/
│   │   ├── health.controller.ts
│   │   └── user.controller.ts
│   ├── services/
│   │   └── user.service.ts # Business logic & data handling
│   ├── routes/
│   │   ├── index.ts        # Central API router (/api/v1)
│   │   ├── health.routes.ts
│   │   └── user.routes.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts # Global error response formatter
│   │   ├── notFound.ts     # 404 handler
│   │   ├── rateLimiter.ts  # Express rate limiting
│   │   └── validate.ts     # Zod schema request validator
│   ├── utils/
│   │   ├── AppError.ts     # Custom HTTP operational error class
│   │   └── asyncHandler.ts # Async request handler wrapper
│   ├── validations/
│   │   └── user.validation.ts # Zod request validation schemas
│   ├── docs/
│   │   └── swagger.json    # OpenAPI 3.0 specification
│   ├── app.ts              # Express application configuration
│   └── server.ts           # Server entry point & graceful shutdown
├── tests/
│   ├── health.test.ts
│   └── user.test.ts
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── tsconfig.json
├── vitest.config.ts
├── package.json
└── README.md
```

---

## 🛠️ Quick Start & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### 4. Interactive API Documentation
Open your browser and navigate to:
```
http://localhost:3000/api-docs
```

---

## 🧪 Testing & Code Quality

### Run Integration Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Build TypeScript Production Bundle
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

---

## 📌 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | API Root Welcome & Metadata |
| **GET** | `/api-docs` | Swagger UI Interactive API Documentation |
| **GET** | `/api/v1/health` | System Health Check & Metrics |
| **GET** | `/api/v1/users` | List all users |
| **GET** | `/api/v1/users/:id` | Get user by ID |
| **POST** | `/api/v1/users` | Create user (validated with Zod) |
| **PUT** | `/api/v1/users/:id` | Update user |
| **DELETE** | `/api/v1/users/:id` | Delete user |

---

## 📄 License
ISC
