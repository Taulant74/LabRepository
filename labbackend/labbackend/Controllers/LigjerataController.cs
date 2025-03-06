using labbackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace labbackend.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    public class LigjerataController : ControllerBase
    {
        private readonly LigjerataContext _context;

        public LigjerataController(LigjerataContext context)
        {
            _context = context;
        }

        // GET: api/Ligjerata
        [HttpGet]
        public async Task<IActionResult> GetLigjeratat()
        {
            return Ok(await _context.Ligjeratat.ToListAsync());
        }

        // GET: api/Ligjerata/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLigjerata(int id)
        {
            var ligjerata = await _context.Ligjeratat.FindAsync(id);
            if (ligjerata == null) return NotFound();
            return Ok(ligjerata);
        }

        // POST: api/Ligjerata
        [HttpPost]
        public async Task<IActionResult> CreateLigjerata([FromBody] Ligjerata ligjerata)
        {
            if (ligjerata == null) return BadRequest("Invalid data");

            _context.Ligjeratat.Add(ligjerata);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLigjerata), new { id = ligjerata.LectureID }, ligjerata);
        }

        // PUT: api/Ligjerata/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLigjerata(int id, [FromBody] Ligjerata ligjerata)
        {
            if (id != ligjerata.LectureID) return BadRequest("ID Mismatch");

            var existingLecture = await _context.Ligjeratat.FindAsync(id);
            if (existingLecture == null) return NotFound();

            existingLecture.LectureName = ligjerata.LectureName;
            existingLecture.LecturerID = ligjerata.LecturerID;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Ligjerata/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigjerata(int id)
        {
            var ligjerata = await _context.Ligjeratat.FindAsync(id);
            if (ligjerata == null) return NotFound();

            _context.Ligjeratat.Remove(ligjerata);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
