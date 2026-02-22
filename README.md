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

> Note: Configure a strong JWT signing key (32+ characters) via environment variables or user secrets for non-development environments. The development key in `appsettings.Development.json` is only for local use.
>
> Note: In development, the API warns about pending migrations and seeds roles once migrations are applied. Manage migrations separately in production.
