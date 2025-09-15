using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MiApiRecetas.Dto;

public partial class ResenaDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int? RecetaId { get; set; }

    [Required]
    public string Usuario { get; set; } = null!;

    [Required]
    public string? Comentario { get; set; }

    [Required]
    public decimal Calificacion { get; set; }

    [Required]
    public DateTime? Fecha { get; set; }
}
