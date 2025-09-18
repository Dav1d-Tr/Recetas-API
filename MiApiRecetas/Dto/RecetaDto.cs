using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MiApiRecetas.Dto;

public class RecetaDto
{
    public int Id { get; set; }
    public string Titulo { get; set; } = null!;
    public string? Descripcion { get; set; }
    public int? CategoriaId { get; set; }
    public string? CategoriaNombre { get; set; }
    public int TiempoPreparacion { get; set; }
    public string? Dificultad { get; set; }
    public DateTime? FechaCreacion { get; set; }
    public string? ImagenUrl { get; set; }

}
