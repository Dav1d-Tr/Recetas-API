-- 1️⃣ Crear la base de datos
CREATE DATABASE BDRECETAS;
GO

USE BDRECETAS;
GO

-- 2️⃣ Tabla: Categorías
CREATE TABLE categorias (
    id INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
GO

-- Datos de ejemplo
INSERT INTO categorias (id, nombre) VALUES
(1, 'Desayuno'),
(2, 'Almuerzo'),
(3, 'Cena'),
(4, 'Postre');
GO

-- 3️⃣ Tabla: Ingredientes
CREATE TABLE ingredientes (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
GO

-- Datos de ejemplo
INSERT INTO ingredientes (id, nombre) VALUES
(1, 'Huevos'),
(2, 'Leche'),
(3, 'Azúcar'),
(4, 'Harina'),
(5, 'Pollo'),
(6, 'Arroz'),
(7, 'Tomate'),
(8, 'Queso');
GO

-- 4️⃣ Tabla: Recetas
CREATE TABLE recetas (
    id INT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
    tiempo_preparacion INT, -- en minutos
    dificultad VARCHAR(20), -- fácil, media, difícil
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    imagen_url VARCHAR(255) -- ruta o URL de la imagen
);
GO

-- Datos de ejemplo
INSERT INTO recetas (id, titulo, descripcion, categoria_id, tiempo_preparacion, dificultad, imagen_url) VALUES
(1, 'Tortilla de Huevos', 'Tortilla sencilla con huevos y leche', 1, 10, 'fácil', '/imagenes/tortilla.jpg'),
(2, 'Pollo al Horno', 'Pollo al horno con especias y arroz', 2, 60, 'media', '/imagenes/pollo_horno.jpg'),
(3, 'Pastel de Chocolate', 'Delicioso pastel de chocolate con cobertura', 4, 90, 'difícil', '/imagenes/pastel_chocolate.jpg');
GO

-- 5️⃣ Tabla: Receta_Ingredientes (muchos a muchos)
CREATE TABLE receta_ingredientes (
    receta_id INT REFERENCES recetas(id) ON DELETE CASCADE,
    ingrediente_id INT REFERENCES ingredientes(id) ON DELETE CASCADE,
    cantidad VARCHAR(50), -- ej: "2 tazas", "3 cucharadas"
    PRIMARY KEY (receta_id, ingrediente_id)
);
GO

-- Datos de ejemplo
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad) VALUES
(1, 1, '3 unidades'),
(1, 2, '100 ml'),
(2, 5, '1 kg'),
(2, 6, '200 g'),
(2, 7, '2 unidades'),
(3, 3, '150 g'),
(3, 4, '200 g'),
(3, 8, '100 g');
GO

-- 6️⃣ Tabla: Reseñas
CREATE TABLE resenas (
    id INT PRIMARY KEY,
    receta_id INT REFERENCES recetas(id) ON DELETE CASCADE,
    usuario VARCHAR(100) NOT NULL,
    comentario TEXT,
    calificacion DECIMAL(2,1) NOT NULL CHECK (calificacion >= 0 AND calificacion <= 5),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);
GO

-- Datos de ejemplo
INSERT INTO resenas (id, receta_id, usuario, comentario, calificacion) VALUES
(1, 1, 'Ana', 'Muy fácil y rápido de hacer', 4.5),
(2, 2, 'Carlos', 'El pollo quedó delicioso', 5),
(3, 3, 'Lucía', 'Un poco difícil, pero vale la pena', 4);
GO
