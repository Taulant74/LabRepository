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
    public class EventBookingController : ControllerBase
    {
        private readonly EventBookingContext _context;

        public EventBookingController(EventBookingContext context)
        {
            _context = context;
        }

        // GET: api/EventBooking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventBooking>>> GetEventBookings()
        {
            return await _context.EventBookings.ToListAsync();
        }

        // GET: api/EventBooking/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EventBooking>> GetEventBooking(int id)
        {
            var eventBooking = await _context.EventBookings.FindAsync(id);

            if (eventBooking == null)
            {
                return NotFound();
            }

            return eventBooking;
        }

        // POST: api/EventBooking
        [HttpPost]
        public async Task<ActionResult<EventBooking>> PostEventBooking(EventBooking eventBooking)
        {
            _context.EventBookings.Add(eventBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventBooking), new { id = eventBooking.EventBookingID }, eventBooking);
        }

        // PUT: api/EventBooking/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventBooking(int id, EventBooking eventBooking)
        {
            if (id != eventBooking.EventBookingID)
            {
                return BadRequest();
            }

            _context.Entry(eventBooking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventBookingExists(id))
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

        // DELETE: api/EventBooking/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventBooking(int id)
        {
            var eventBooking = await _context.EventBookings.FindAsync(id);
            if (eventBooking == null)
            {
                return NotFound();
            }

            _context.EventBookings.Remove(eventBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventBookingExists(int id)
        {
            return _context.EventBookings.Any(e => e.EventBookingID == id);
        }
    }
}
