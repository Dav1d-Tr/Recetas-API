using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MiApiRecetas.Dto;

public class CreateRecetaDto
{
    public string? Titulo { get; set; }
    public string? Descripcion { get; set; }
    public int? CategoriaId { get; set; }
    public int? TiempoPreparacion { get; set; }
    public string? Dificultad { get; set; }
    public string? ImagenUrl { get; set; }
}
