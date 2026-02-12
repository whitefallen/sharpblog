# SharpBlog

SharpBlog is a layered ASP.NET Core Web API for blogging with user registration, login, role support, posts, and comments.

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

> Note: Configure a strong JWT signing key (32+ characters) for non-development environments.
>
> Note: In development, the API applies migrations and seeds roles on startup. Manage migrations separately in production.
