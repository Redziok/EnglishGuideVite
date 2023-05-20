# Stage 1: Build the React app
FROM node:16 as build-react
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Stage 2: Build the ASP.NET Core API
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-api
WORKDIR /app/EnglishGuideWeb
COPY EnglishGuideWeb/*.csproj ./
RUN dotnet restore
COPY EnglishGuideWeb ./
RUN dotnet publish -c Release -o out

# Stage 3: Build the final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-api /app/EnglishGuideWeb/out .
COPY --from=build-react /app/frontend/dist ./wwwroot

# Set the ASP.NET Core environment to Production
ENV ASPNETCORE_ENVIRONMENT=Production
ENV DATABASE_CONNECTION_STRING=""

# Expose the port used by the ASP.NET Core API
EXPOSE 80

# Start the ASP.NET Core API
ENTRYPOINT ["dotnet", "EnglishGuideWeb.dll"]