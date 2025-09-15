using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiApiRecetas.Data;
using MiApiRecetas.Models;
using MiApiRecetas.Dto;

namespace MiApiRecetas.Controllers
{
    [ApiController]
    [Route("api/recetas/{recetaId}/ingredientes")]
    public class RecetaIngredientesController : ControllerBase
    {
        private readonly BdrecetasContext _context;

        public RecetaIngredientesController(BdrecetasContext context)
        {
            _context = context;
        }

        // GET: api/recetas/{recetaId}/ingredientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IngredienteDto>>> GetIngredientesByReceta(int recetaId)
        {
            var receta = await _context.Recetas
                .Include(r => r.RecetaIngredientes)
                    .ThenInclude(ri => ri.Ingrediente)
                .FirstOrDefaultAsync(r => r.Id == recetaId);

            if (receta == null)
            {
                return NotFound(new { mensaje = $"No existe la receta con id {recetaId}" });
            }

            var ingredientes = receta.RecetaIngredientes
                .Select(ri => new IngredienteDto
                {
                    Id = ri.Ingrediente.Id,
                    Nombre = ri.Ingrediente.Nombre
                })
                .ToList();

            return Ok(ingredientes);
        }


        // POST: api/recetas/{recetaId}/ingredientes
        [HttpPost]
        public async Task<ActionResult> AddIngredienteToReceta(int recetaId, [FromBody] int ingredienteId)
        {
            var receta = await _context.Recetas.FindAsync(recetaId);
            if (receta == null)
                return NotFound(new { mensaje = $"Receta {recetaId} no encontrada" });

            var ingrediente = await _context.Ingredientes.FindAsync(ingredienteId);
            if (ingrediente == null)
                return NotFound(new { mensaje = $"Ingrediente {ingredienteId} no encontrado" });

            var existeRelacion = await _context.RecetaIngredientes
                .AnyAsync(ri => ri.RecetaId == recetaId && ri.IngredienteId == ingredienteId);

            if (existeRelacion)
                return BadRequest(new { mensaje = "El ingrediente ya está asociado a la receta" });

            var recetaIngrediente = new RecetaIngrediente
            {
                RecetaId = recetaId,
                IngredienteId = ingredienteId
            };

            _context.RecetaIngredientes.Add(recetaIngrediente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetIngredientesByReceta),
                new { recetaId },
                new { mensaje = $"Ingrediente {ingredienteId} agregado a la receta {recetaId}" }
            );
        }

        // DELETE: api/recetas/{recetaId}/ingredientes/{ingredienteId}
        [HttpDelete("{ingredienteId}")]
        public async Task<ActionResult> RemoveIngredienteFromReceta(int recetaId, int ingredienteId)
        {
            var recetaIngrediente = await _context.RecetaIngredientes
                .FirstOrDefaultAsync(ri => ri.RecetaId == recetaId && ri.IngredienteId == ingredienteId);

            if (recetaIngrediente == null)
                return NotFound(new { mensaje = "La relación receta-ingrediente no existe" });

            _context.RecetaIngredientes.Remove(recetaIngrediente);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = $"Ingrediente {ingredienteId} eliminado de la receta {recetaId}" });
        }
    }
}
