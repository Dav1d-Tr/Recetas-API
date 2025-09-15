using Microsoft.AspNetCore.Mvc;
using MiApiRecetas.Data;
using MiApiRecetas.Dto;
using MiApiRecetas.Models;
using Microsoft.EntityFrameworkCore;

namespace MiApiRecetas.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly BdrecetasContext _context;

        public CategoriaController(BdrecetasContext context)
        {
            _context = context;
        }

        private CategoriaDto ToDto(Categoria categoria) => new CategoriaDto
        {
            Id = categoria.Id,
            Nombre = categoria.Nombre
        };

        private Categoria ToEntity(CategoriaDto dto) => new Categoria
        {
            Id = dto.Id,
            Nombre = dto.Nombre
        };

        [HttpPost]
        public async Task<ActionResult<CategoriaDto>> CreateIngrediente(CategoriaDto categoriaDto)
        {
            var existe = await _context.Categorias.AnyAsync(i => i.Nombre == categoriaDto.Nombre);
            if (existe)
                return BadRequest("Ya existe un ingrediente con ese nombre.");

            var categoria = ToEntity(categoriaDto);
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            categoriaDto.Id = categoria.Id;
            return CreatedAtAction(nameof(GetIngredientes), new { id = categoria.Id }, categoriaDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriaDto>> GetCategorias(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
            {
                return NotFound();
            }
            return ToDto(categoria);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaDto>>> GetIngredientes()
        {
            var categorias = await _context.Categorias.ToListAsync();
            return categorias.Select(ToDto).ToList();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoria(CategoriaDto categoriaDto)
        {

            var existe = await _context.Categorias.AnyAsync(i => i.Nombre == categoriaDto.Nombre && i.Id != categoriaDto.Id);
            if (existe)
                return BadRequest("Ya existe otra Categoria con ese nombre.");

            var categoria = await _context.Categorias.FindAsync(categoriaDto.Id);
            if (categoria == null)
            {
                return NotFound();
            }

            categoria.Nombre = categoriaDto.Nombre;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            bool enUso = await _context.Recetas.AnyAsync(r => r.CategoriaId == id);
            if (enUso)
                return BadRequest("No se puede eliminar la categoría porque está en uso en recetas.");

            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
            {
                return NotFound();
            }

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}