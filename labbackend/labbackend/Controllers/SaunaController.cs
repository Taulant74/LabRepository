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
    public class SaunaController : ControllerBase
    {
        private readonly SaunaContext _context;

        public SaunaController(SaunaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sauna>>> GetSaunas()
        {
            return await _context.Saunas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sauna>> GetSauna(int id)
        {
            var sauna = await _context.Saunas.FindAsync(id);

            if (sauna == null)
            {
                return NotFound();
            }

            return sauna;
        }

        [HttpPost]
        public async Task<ActionResult<Sauna>> PostSauna(Sauna sauna)
        {
            _context.Saunas.Add(sauna);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSauna), new { id = sauna.SaunaID }, sauna);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSauna(int id, Sauna sauna)
        {
            if (id != sauna.SaunaID)
            {
                return BadRequest();
            }

            _context.Entry(sauna).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaunaExists(id))
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
        public async Task<IActionResult> DeleteSauna(int id)
        {
            var sauna = await _context.Saunas.FindAsync(id);
            if (sauna == null)
            {
                return NotFound();
            }

            _context.Saunas.Remove(sauna);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaunaExists(int id)
        {
            return _context.Saunas.Any(e => e.SaunaID == id);
        }
    }
}
