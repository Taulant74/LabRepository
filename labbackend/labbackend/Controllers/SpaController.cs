using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using labbackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpaController : ControllerBase
    {
        private readonly SpaContext _context;

        public SpaController(SpaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Spa>>> GetSpas()
        {
            return await _context.Spas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Spa>> GetSpa(int id)
        {
            var spa = await _context.Spas.FindAsync(id);

            if (spa == null)
            {
                return NotFound();
            }

            return spa;
        }

        [HttpPost]
        public async Task<ActionResult<Spa>> PostSpa(Spa spa)
        {
            _context.Spas.Add(spa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSpa), new { id = spa.SpaID }, spa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpa(int id, Spa spa)
        {
            if (id != spa.SpaID)
            {
                return BadRequest();
            }

            _context.Entry(spa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpa(int id)
        {
            var spa = await _context.Spas.FindAsync(id);
            if (spa == null)
            {
                return NotFound();
            }

            _context.Spas.Remove(spa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SpaExists(int id)
        {
            return _context.Spas.Any(e => e.SpaID == id);
        }
    }
}
