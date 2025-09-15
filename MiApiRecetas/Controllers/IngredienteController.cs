using Microsoft.AspNetCore.Mvc;
using MiApiRecetas.Data;
using MiApiRecetas.Dto;
using MiApiRecetas.Models;
using Microsoft.EntityFrameworkCore;

namespace MiApiRecetas.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class IngredienteController : ControllerBase
    {
        private readonly BdrecetasContext _context;

        public IngredienteController(BdrecetasContext context)
        {
            _context = context;
        }

        private IngredienteDto ToDto(Ingrediente ingrediente) => new IngredienteDto
        {
            Id = ingrediente.Id,
            Nombre = ingrediente.Nombre
        };

        private Ingrediente ToEntity(IngredienteDto dto) => new Ingrediente
        {
            Id = dto.Id,
            Nombre = dto.Nombre
        };

        [HttpPost]
        public async Task<ActionResult<IngredienteDto>> CreateIngrediente(IngredienteDto ingredienteDto)
        {
            var existe = await _context.Ingredientes.AnyAsync(i => i.Nombre == ingredienteDto.Nombre);
            if (existe)
                return BadRequest("Ya existe un ingrediente con ese nombre.");

            var ingrediente = ToEntity(ingredienteDto);
            _context.Ingredientes.Add(ingrediente);
            await _context.SaveChangesAsync();

            ingredienteDto.Id = ingrediente.Id;
            return CreatedAtAction(nameof(GetIngredientes), new { id = ingrediente.Id }, ingredienteDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IngredienteDto>> GetIngredientes(int id)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(id);
            if (ingrediente == null)
            {
                return NotFound();
            }
            return ToDto(ingrediente);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IngredienteDto>>> GetIngredientes()
        {
            var ingredientes = await _context.Ingredientes.ToListAsync();
            return ingredientes.Select(ToDto).ToList();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIngrediente(IngredienteDto ingredienteDto)
        {

            var existe = await _context.Ingredientes.AnyAsync(i => i.Nombre == ingredienteDto.Nombre && i.Id != ingredienteDto.Id);
            if (existe)
                return BadRequest("Ya existe otro ingrediente con ese nombre.");

            var ingrediente = await _context.Ingredientes.FindAsync(ingredienteDto.Id);
            if (ingrediente == null)
            {
                return NotFound();
            }

            ingrediente.Nombre = ingredienteDto.Nombre;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngrediente(int id)
        {
            bool enUso = await _context.RecetaIngredientes.AnyAsync(ri => ri.IngredienteId == id);
            if (enUso)
                return BadRequest("No se puede eliminar el ingrediente porque está en uso en recetas.");

            var ingrediente = await _context.Ingredientes.FindAsync(id);
            if (ingrediente == null)
            {
                return NotFound();
            }

            _context.Ingredientes.Remove(ingrediente);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}