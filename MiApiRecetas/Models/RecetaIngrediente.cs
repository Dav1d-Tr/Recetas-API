using System;
using System.Collections.Generic;

namespace MiApiRecetas.Models;

public partial class RecetaIngrediente
{
    public int RecetaId { get; set; }

    public int IngredienteId { get; set; }

    public string? Cantidad { get; set; }

    public virtual Ingrediente Ingrediente { get; set; } = null!;

    public virtual Receta Receta { get; set; } = null!;
}
