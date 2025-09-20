using Microsoft.EntityFrameworkCore;
using MiApiRecetas.Data;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Agregar servicios al contenedor
builder.Services.AddControllers();

// 🔹 Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Conexión a la BD
var connectionString = builder.Configuration.GetConnectionString("SqlServer");
builder.Services.AddDbContext<BdrecetasContext>(options =>
    options.UseSqlServer(connectionString)
);

// 🔹 Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // URL del frontend React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 🔹 Middleware de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔹 Activar CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();

// 🔹 Mapear controladores
app.MapControllers();

app.Run();
