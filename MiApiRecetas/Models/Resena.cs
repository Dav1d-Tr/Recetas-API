using System;
using System.Collections.Generic;

namespace MiApiRecetas.Models;

public partial class Resena
{
    public int Id { get; set; }

    public int? RecetaId { get; set; }

    public string Usuario { get; set; } = null!;

    public string? Comentario { get; set; }

    public decimal Calificacion { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Receta? Receta { get; set; }
}
