using System;
using System.Collections.Generic;

namespace MiApiRecetas.Models;

public partial class Ingrediente
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<RecetaIngrediente> RecetaIngredientes { get; set; } = new List<RecetaIngrediente>();
}
