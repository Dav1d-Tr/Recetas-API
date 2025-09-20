using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiApiRecetas.Data;
using MiApiRecetas.Models;
using MiApiRecetas.Dto;

namespace MiApiRecetas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecetaController : ControllerBase
    {
        private readonly BdrecetasContext _context;

        public RecetaController(BdrecetasContext context)
        {
            _context = context;
        }

        // Convierte entidad -> DTO
        private RecetaDto ToDto(Receta receta)
        {
            return new RecetaDto
            {
                Id = receta.Id,
                Titulo = receta.Titulo,
                Descripcion = receta.Descripcion,
                CategoriaId = receta.CategoriaId,
                CategoriaNombre = receta.Categoria?.Nombre,
                TiempoPreparacion = receta.TiempoPreparacion,
                Dificultad = receta.Dificultad,
                FechaCreacion = receta.FechaCreacion,
                ImagenUrl = receta.ImagenUrl,
                Ingredientes = receta.RecetaIngredientes
                    .Select(ri => new IngredienteDto
                    {
                        Id = ri.Ingrediente.Id,
                        Nombre = ri.Ingrediente.Nombre
                    })
                    .ToList()
            };
        }

        // POST: api/Receta
        [HttpPost]
        public async Task<ActionResult<RecetaDto>> CreateReceta([FromBody] RecetaDto dto)
        {
            if (dto.TiempoPreparacion <= 0)
                return BadRequest("El tiempo de preparación debe ser mayor a 0");

            var receta = new Receta
            {
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                CategoriaId = dto.CategoriaId,
                TiempoPreparacion = dto.TiempoPreparacion,
                Dificultad = dto.Dificultad,
                ImagenUrl = dto.ImagenUrl,
                FechaCreacion = DateTime.Now
            };

            _context.Recetas.Add(receta);
            await _context.SaveChangesAsync();

            // 🔹 Guardar ingredientes relacionados
            if (dto.IngredientesIds != null && dto.IngredientesIds.Any())
            {
                foreach (var ingId in dto.IngredientesIds)
                {
                    _context.RecetaIngredientes.Add(new RecetaIngrediente
                    {
                        RecetaId = receta.Id,
                        IngredienteId = ingId
                    });
                }
                await _context.SaveChangesAsync();
            }

            // Recargar con sus relaciones
            var recetaConRelaciones = await _context.Recetas
                .Include(r => r.Categoria)
                .Include(r => r.RecetaIngredientes).ThenInclude(ri => ri.Ingrediente)
                .FirstAsync(r => r.Id == receta.Id);

            return CreatedAtAction(nameof(GetReceta), new { id = receta.Id }, ToDto(recetaConRelaciones));
        }

        // GET: api/Receta/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RecetaDto>> GetReceta(int id)
        {
            var receta = await _context.Recetas
                .Include(r => r.Categoria)
                .Include(r => r.RecetaIngredientes).ThenInclude(ri => ri.Ingrediente)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (receta == null)
                return NotFound();

            return ToDto(receta);
        }

        // GET: api/Receta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecetaDto>>> GetRecetas()
        {
            var recetas = await _context.Recetas
                .Include(r => r.Categoria)
                .Include(r => r.RecetaIngredientes).ThenInclude(ri => ri.Ingrediente)
                .ToListAsync();

            return recetas.Select(ToDto).ToList();
        }

        // PUT: api/Receta/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReceta(int id, [FromBody] RecetaDto dto)
        {
            if (id != dto.Id)
                return BadRequest("El ID de la URL no coincide con el del objeto");

            var receta = await _context.Recetas
                .Include(r => r.RecetaIngredientes)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (receta == null)
                return NotFound();

            // Actualizar propiedades
            receta.Titulo = dto.Titulo;
            receta.Descripcion = dto.Descripcion;
            receta.CategoriaId = dto.CategoriaId;
            receta.TiempoPreparacion = dto.TiempoPreparacion;
            receta.Dificultad = dto.Dificultad;
            receta.ImagenUrl = dto.ImagenUrl;

            // 🔹 Actualizar ingredientes
            var ingredientesActuales = receta.RecetaIngredientes.ToList();
            _context.RecetaIngredientes.RemoveRange(ingredientesActuales);

            if (dto.IngredientesIds != null && dto.IngredientesIds.Any())
            {
                foreach (var ingId in dto.IngredientesIds)
                {
                    _context.RecetaIngredientes.Add(new RecetaIngrediente
                    {
                        RecetaId = receta.Id,
                        IngredienteId = ingId
                    });
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Receta/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceta(int id)
        {
            var receta = await _context.Recetas.FindAsync(id);
            if (receta == null)
                return NotFound();

            _context.Recetas.Remove(receta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
