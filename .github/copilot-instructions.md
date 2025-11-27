# Copilot Instructions for trabajo-practico-integrador-2

## Project Overview
This is a Node.js backend project using Express and MongoDB (via Mongoose). It implements a modular architecture for managing articles, users, comments, tags, and authentication.

## Key Components
- **Entry Point:** `app.js` sets up Express, middleware, and routes.
- **Routes:** Defined in `src/routes/`, each resource (article, user, comment, tag, auth) has its own route file. All routes are aggregated in `src/routes/index.js`.
- **Controllers:** Business logic for each resource is in `src/controllers/`. Controllers interact with models and handle request/response.
- **Models:** Mongoose schemas for each resource are in `src/models/`.
- **Config:** Database connection is managed in `src/config/database.js`.
- **Helpers:** Utility functions for bcrypt and JWT are in `src/helpers/`.
- **Middleware:** Custom middleware (e.g., authentication) should be placed in `src/middleware/`.

## Patterns & Conventions
- **File Naming:** Singular for controllers/models (e.g., `user.controller.js`, `user.models.js`).
- **Modularity:** Each resource (user, article, etc.) has its own controller, model, and route file.
- **Authentication:** JWT-based, with helpers in `src/helpers/jwt.js` and bcrypt in `src/helpers/bcrypt.js`.
- **Error Handling:** Controllers typically use Express's `next(err)` for error propagation.
- **Database:** Uses Mongoose for schema definition and data access.

## Developer Workflows
- **Start Server:**
  ```powershell
  node app.js
  ```
- **Install Dependencies:**
  ```powershell
  npm install
  ```
- **Environment Variables:**
  Store secrets and DB connection strings in `.env` (not committed).

## Integration Points
- **External:** MongoDB (via Mongoose), bcrypt, JWT.
- **Internal:** Controllers call models directly; routes call controllers.

## Examples
- To add a new resource, create a model, controller, and route file in their respective folders, then register the route in `src/routes/index.js`.
- For authentication, see `auth.controller.js` and `auth.routes.js`.

## References
- `app.js` (main setup)
- `src/routes/index.js` (route aggregation)
- `src/config/database.js` (DB connection)
- `src/helpers/` (utility functions)

---
**Feedback:** Please review and suggest improvements or clarify any missing conventions or workflows.
