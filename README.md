# SharpBlog

SharpBlog is a full-stack blog platform with a layered ASP.NET Core Web API backend and a React + TypeScript frontend.

## Getting Started

1. Restore and build:

```bash
dotnet build SharpBlog.slnx
```

2. Apply database migrations:

```bash
dotnet ef database update -p SharpBlog.Infrastructure -s SharpBlog.Web
```

3. Run the API:

```bash
dotnet run --project SharpBlog.Web
```

Swagger UI is available in development to explore the endpoints.

## Frontend (React)

The frontend lives in `SharpBlog.Frontend` and uses Vite, React Router, TanStack Query, React Hook Form, and Zod.

Run it locally:

```bash
cd SharpBlog.Frontend
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` and proxies API calls to `http://localhost:5000`.

## Docker Compose (API + Frontend)

Start full stack with one command:

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:5000`
- Swagger: `http://localhost:5000/swagger`

## Docker Compose (Frontend Hot Reload Profile)

Use the `dev` profile to run Vite in Docker with hot reload:

```bash
docker compose --profile dev up --build
```

- Frontend dev (HMR): `http://localhost:5173`
- API: `http://localhost:5000`

The default frontend container on `http://localhost:3000` stays available, while the `dev` profile adds a live-reload frontend for development.

> Note: Configure a strong JWT signing key (32+ characters) via environment variables or user secrets for non-development environments. The development key in `appsettings.Development.json` is only for local use.
>
> Note: In development, the API warns about pending migrations and seeds roles once migrations are applied. Manage migrations separately in production.
