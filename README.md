# 🍲 **MiApiRecetas**

API RESTful construida con ASP.NET Core 8 y Entity Framework Core para gestionar recetas, ingredientes, categorías y reseñas.

---

## 🚀 **Características**

- CRUD de Recetas, Ingredientes y Categorías.

- Gestión de reseñas con validación de calificación (0–5).

- Relación muchos a muchos entre recetas e ingredientes.

- Documentación interactiva con Swagger.

--- 

## 🛠️ **Tecnologías**

- C# / .NET 8

- Entity Framework Core

- SQL Server

- Swagger / OpenAPI

---

## 📂 **Endpoints principales**
**Recetas**

- GET /api/recetas → Listar todas las recetas

- GET /api/recetas/{id} → Obtener una receta

- POST /api/recetas → Crear receta

- PUT /api/recetas/{id} → Actualizar receta

- DELETE /api/recetas/{id} → Eliminar receta

**Ingredientes**

- GET /api/ingredientes → Listar ingredientes

- POST /api/ingredientes → Crear ingrediente

**Categorías**

- GET /api/categorias → Listar categorías

- POST /api/categorias → Crear categoría

**Reseñas**

- GET /api/resenas/{id} → Obtener reseña

- POST /api/resenas → Crear reseña

**Relación Recetas–Ingredientes**

- GET /api/recetas/{id}/ingredientes → Ingredientes de una receta

- POST /api/recetas/{id}/ingredientes → Agregar ingrediente

- DELETE /api/recetas/{id}/ingredientes/{ingredienteId} → Quitar ingrediente

---

## ⚙️ **Configuración**

1. Clonar el repositorio:
    
    git clone https://github.com/tuusuario/MiApiRecetas.git

2. Configurar la conexión a SQL Server en appsettings.json: 

    "ConnectionStrings": {
    "SqlServer": "Server=TU_SERVIDOR;Database=BDRECETAS;Integrated Security=True;TrustServerCertificate=True;"
    }

3. Ejecutar la aplicación:

    dotnet run

4. Abrir Swagger en: http://localhost:5082/swagger
