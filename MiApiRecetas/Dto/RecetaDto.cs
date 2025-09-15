using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MiApiRecetas.Dto;

public class RecetaDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Titulo { get; set; } = null!;
    [Required]
    public string? Descripcion { get; set; }
    [Required]
    public int? CategoriaId { get; set; }
    [Required]
    public int TiempoPreparacion { get; set; }
    [Required]
    public string? Dificultad { get; set; }
    [Required]
    public DateTime? FechaCreacion { get; set; }
    [Required]
    public string? ImagenUrl { get; set; }

}
