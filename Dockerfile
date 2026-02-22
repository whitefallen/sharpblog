# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY SharpBlog.slnx .
COPY SharpBlog.Domain/SharpBlog.Domain.csproj SharpBlog.Domain/
COPY SharpBlog.Application/SharpBlog.Application.csproj SharpBlog.Application/
COPY SharpBlog.Infrastructure/SharpBlog.Infrastructure.csproj SharpBlog.Infrastructure/
COPY SharpBlog.Web/SharpBlog.Web.csproj SharpBlog.Web/

# Restore dependencies
RUN dotnet restore SharpBlog.Web/SharpBlog.Web.csproj

# Copy everything else and build
COPY . .
RUN dotnet publish SharpBlog.Web/SharpBlog.Web.csproj -c Release -o /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Create directory for SQLite database
RUN mkdir -p /app/data

COPY --from=build /app/publish .

# Expose port
EXPOSE 8080

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "SharpBlog.Web.dll"]
