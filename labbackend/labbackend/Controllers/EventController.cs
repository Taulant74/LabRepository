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
    public class EventController : ControllerBase
    {
        private readonly EventContext _context;

        public EventController(EventContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var evnt = await _context.Events.FindAsync(id);
            if (evnt == null) return NotFound();
            return evnt;
        }

        [HttpPost]
        public async Task<ActionResult<Event>> CreateEvent(Event evnt)
        {
            _context.Events.Add(evnt);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEvent), new { id = evnt.EventID }, evnt);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, Event evnt)
        {
            if (id != evnt.EventID) return BadRequest();
            _context.Entry(evnt).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var evnt = await _context.Events.FindAsync(id);
            if (evnt == null) return NotFound();
            _context.Events.Remove(evnt);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
