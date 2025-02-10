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
    public class GymController : ControllerBase
    {
        private readonly GymContext _context;

        public GymController(GymContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gym>>> GetGyms()
        {
            return await _context.Gyms.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gym>> GetGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);
            if (gym == null)
            {
                return NotFound();
            }
            return gym;
        }

        [HttpPost]
        public async Task<ActionResult<Gym>> PostGym(Gym gym)
        {
            _context.Gyms.Add(gym);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGym), new { id = gym.GymID }, gym);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGym(int id, Gym gym)
        {
            if (id != gym.GymID)
            {
                return BadRequest();
            }
            _context.Entry(gym).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);
            if (gym == null)
            {
                return NotFound();
            }
            _context.Gyms.Remove(gym);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
