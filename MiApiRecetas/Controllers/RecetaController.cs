using MiApiRecetas.Data;
using Microsoft.AspNetCore.Mvc;
using MiApiRecetas.Dto;
using MiApiRecetas.Models;
using Microsoft.EntityFrameworkCore;

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

        private bool IsValidTime(int time) => time > 0;

        private RecetaDto ToDto(Receta receta) => new RecetaDto
        {
            Id = receta.Id,
            Titulo = receta.Titulo,
            Descripcion = receta.Descripcion,
            CategoriaId = receta.CategoriaId,
            CategoriaNombre = receta.Categoria != null ? receta.Categoria.Nombre : null,
            TiempoPreparacion = receta.TiempoPreparacion,
            Dificultad = receta.Dificultad,
            FechaCreacion = receta.FechaCreacion,
            ImagenUrl = receta.ImagenUrl
        };

        [HttpPost]
        public async Task<ActionResult<RecetaDto>> CreateReceta(CreateRecetaDto dto)
        {
            if (!IsValidTime(dto.TiempoPreparacion))
            {
                return BadRequest("El tiempo de preparación debe ser mayor a 0");
            }

            var receta = new Receta
            {
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                CategoriaId = dto.CategoriaId,
                TiempoPreparacion = dto.TiempoPreparacion,
                Dificultad = dto.Dificultad,
                ImagenUrl = dto.ImagenUrl,
                FechaCreacion = DateTime.Now // 🔹 lo maneja el servidor
            };

            _context.Recetas.Add(receta);
            await _context.SaveChangesAsync();

            var recetaDto = ToDto(receta);
            return CreatedAtAction(nameof(GetReceta), new { id = receta.Id }, recetaDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RecetaDto>> GetReceta(int id)
        {
            var receta = await _context.Recetas
                                       .Include(r => r.Categoria)
                                       .FirstOrDefaultAsync(r => r.Id == id);

            if (receta == null)
            {
                return NotFound();
            }

            return ToDto(receta);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecetaDto>>> GetRecetas()
        {
            var recetas = await _context.Recetas
                                        .Include(r => r.Categoria)
                                        .ToListAsync();

            return recetas.Select(ToDto).ToList();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReceta(int id, RecetaDto recetaDto)
        {
            if (id != recetaDto.Id)
            {
                return BadRequest("El ID de la URL no coincide con el del objeto");
            }

            if (!IsValidTime(recetaDto.TiempoPreparacion))
            {
                return BadRequest("El tiempo de preparación debe ser mayor a 0");
            }

            var receta = await _context.Recetas.FindAsync(id);
            if (receta == null)
            {
                return NotFound();
            }

            receta.Titulo = recetaDto.Titulo;
            receta.Descripcion = recetaDto.Descripcion;
            receta.CategoriaId = recetaDto.CategoriaId;
            receta.TiempoPreparacion = recetaDto.TiempoPreparacion;
            receta.Dificultad = recetaDto.Dificultad;
            receta.ImagenUrl = recetaDto.ImagenUrl;
            // 🔹 No tocamos FechaCreacion (se mantiene la original)

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceta(int id)
        {
            var receta = await _context.Recetas.FindAsync(id);
            if (receta == null)
            {
                return NotFound();
            }

            _context.Recetas.Remove(receta);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
