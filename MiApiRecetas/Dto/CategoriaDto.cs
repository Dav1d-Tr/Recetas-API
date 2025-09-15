using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace MiApiRecetas.Dto;

public partial class CategoriaDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Nombre { get; set; } = null!;

}
