using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MiApiRecetas.Models;

public partial class RecetaIngredienteDto
{
    [Required]
    public int RecetaId { get; set; }

    [Required]
    public int IngredienteId { get; set; }
    
    [Required]
    public string? Cantidad { get; set; }

}
