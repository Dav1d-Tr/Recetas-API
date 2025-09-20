using System;
using System.Collections.Generic;

namespace MiApiRecetas.Models;

public partial class Receta
{
    public int Id { get; set; }

    public string? Titulo { get; set; } = null!;

    public string? Descripcion { get; set; }

    public int? CategoriaId { get; set; }

    public int? TiempoPreparacion { get; set; }

    public string? Dificultad { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public string? ImagenUrl { get; set; }

    public virtual Categoria? Categoria { get; set; }

    public virtual ICollection<RecetaIngrediente> RecetaIngredientes { get; set; } = new List<RecetaIngrediente>();

    public virtual ICollection<Resena> Resenas { get; set; } = new List<Resena>();
}
