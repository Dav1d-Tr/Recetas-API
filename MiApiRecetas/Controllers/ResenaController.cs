using Microsoft.AspNetCore.Mvc;
using MiApiRecetas.Data;
using MiApiRecetas.Dto;
using MiApiRecetas.Models;
using Microsoft.EntityFrameworkCore;

namespace MiApiRecetas.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ResenaController : ControllerBase
    {
        private readonly BdrecetasContext _context;

        public ResenaController(BdrecetasContext context)
        {
            _context = context;
        }

        private bool IsValidQualification(decimal qualification)
        {
            return qualification >= 0 && qualification <= 5;
        }

        private ResenaDto ToDto(Resena resena) => new ResenaDto
        {
            Id = resena.Id,
            RecetaId = resena.RecetaId,
            Usuario = resena.Usuario,
            Comentario = resena.Comentario,
            Calificacion = resena.Calificacion,
            Fecha = resena.Fecha
        };

        private Resena ToEntity(ResenaDto dto) => new Resena
        {
            Id = dto.Id,
            RecetaId = dto.RecetaId,
            Usuario = dto.Usuario,
            Comentario = dto.Comentario,
            Calificacion = dto.Calificacion,
            Fecha = dto.Fecha
        };

        [HttpPost]
        public async Task<ActionResult<ResenaDto>> CreateResena(ResenaDto resenaDto)
        {
            if (!IsValidQualification(resenaDto.Calificacion))
            {
                return BadRequest("El tiempo de la calificación debe estar entre 0 y 5");
            }

            var recetaExiste = await _context.Recetas.AnyAsync(r => r.Id == resenaDto.RecetaId);
            if (!recetaExiste)
            {
                return BadRequest($"La receta con ID {resenaDto.RecetaId} no existe.");
            }

            var resena = ToEntity(resenaDto);
            _context.Resenas.Add(resena);
            await _context.SaveChangesAsync();

            resenaDto.Id = resena.Id;
            return CreatedAtAction(nameof(GetResena), new { id = resena.Id }, resenaDto);
        }

        [HttpGet("Receta/{recetaId}")]
        public async Task<ActionResult<IEnumerable<ResenaDto>>> GetResenasByReceta(int recetaId)
        {
            var resenas = await _context.Resenas
            .Where(r => r.RecetaId == recetaId)
            .Select(r => new ResenaDto
            {
                Id = r.Id,
                RecetaId = r.RecetaId,
                Usuario = r.Usuario,
                Comentario = r.Comentario,
                Calificacion = r.Calificacion,
                Fecha = r.Fecha
            }).ToListAsync();

            if (!resenas.Any())
            {
                return NotFound($"No hay reseñas para la receta con id {recetaId}");
            }

            return Ok(resenas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResenaDto>> GetResena(int id)
        {
            var resena = await _context.Resenas.FindAsync(id);
            if (resena == null)
            {
                return NotFound();
            }
            return ToDto(resena);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResenaDto>>> GetResenas()
        {
            var resenas = await _context.Resenas.ToListAsync();
            return resenas.Select(ToDto).ToList();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResena(int id)
        {
            var resena = await _context.Resenas.FindAsync(id);
            if (resena == null)
            {
                return NotFound();
            }

            _context.Resenas.Remove(resena);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}