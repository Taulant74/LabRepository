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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventBooking>>> GetEventBookings()
        {
            return await _context.EventBookings.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventBooking>> GetEventBooking(int id)
        {
            var booking = await _context.EventBookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return booking;
        }

        [HttpPost]
        public async Task<ActionResult<EventBooking>> PostEventBooking(EventBooking booking)
        {
            _context.EventBookings.Add(booking);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEventBooking), new { id = booking.EventBookingID }, booking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventBooking(int id, EventBooking booking)
        {
            if (id != booking.EventBookingID)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventBooking(int id)
        {
            var booking = await _context.EventBookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.EventBookings.Remove(booking);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
