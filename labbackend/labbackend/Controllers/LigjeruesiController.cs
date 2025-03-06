using labbackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace labbackend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LigjeruesiController : ControllerBase
    {
        private readonly LigjeruesiContext _context;

        public LigjeruesiController(LigjeruesiContext context)
        {
            _context = context;
        }

        // GET: api/Ligjeruesi
        [HttpGet]
        public async Task<IActionResult> GetLigjeruesit()
        {
            return Ok(await _context.Ligjeruesit.ToListAsync());
        }

        // GET: api/Ligjeruesi/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLigjeruesi(int id)
        {
            var ligjeruesi = await _context.Ligjeruesit.FindAsync(id);
            if (ligjeruesi == null) return NotFound();
            return Ok(ligjeruesi);
        }

        // POST: api/Ligjeruesi
        [HttpPost]
        public async Task<IActionResult> CreateLigjeruesi([FromBody] Ligjeruesi ligjeruesi)
        {
            if (ligjeruesi == null) return BadRequest("Invalid data");

            _context.Ligjeruesit.Add(ligjeruesi);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLigjeruesi), new { id = ligjeruesi.LecturerID }, ligjeruesi);
        }

        // PUT: api/Ligjeruesi/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLigjeruesi(int id, [FromBody] Ligjeruesi ligjeruesi)
        {
            if (id != ligjeruesi.LecturerID) return BadRequest("ID Mismatch");

            var existingLecturer = await _context.Ligjeruesit.FindAsync(id);
            if (existingLecturer == null) return NotFound();

            existingLecturer.Emri = ligjeruesi.Emri;
            existingLecturer.Departamenti = ligjeruesi.Departamenti;
            existingLecturer.Email = ligjeruesi.Email;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Ligjeruesi/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigjeruesi(int id)
        {
            var ligjeruesi = await _context.Ligjeruesit.FindAsync(id);
            if (ligjeruesi == null) return NotFound();

            _context.Ligjeruesit.Remove(ligjeruesi);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }


}
