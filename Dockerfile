# Etapa de construcción
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos solo el csproj primero para el restore
COPY MiApiRecetas/*.csproj MiApiRecetas/
RUN dotnet restore MiApiRecetas/MiApiRecetas.csproj

# Ahora copiamos todo el código
COPY . .
RUN dotnet publish MiApiRecetas/MiApiRecetas.csproj -c Release -o /app

# Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MiApiRecetas.dll"]
