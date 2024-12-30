using Microsoft.AspNetCore.Mvc;
using labbackend.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomContext _context;

        public RoomController(RoomContext context)
        {
            _context = context;
        }

        // GET: api/Room
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _context.Rooms.ToListAsync();
            return Ok(rooms);
        }

        // GET: api/Room/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomID == id);

            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        // POST: api/Room
        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoom), new { id = room.RoomID }, room);
        }

        // PUT: api/Room/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] Room room)
        {
            if (id != room.RoomID)
            {
                return BadRequest("Room ID mismatch");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingRoom = await _context.Rooms.FindAsync(id);
            if (existingRoom == null)
            {
                return NotFound();
            }

            existingRoom.HotelID = room.HotelID;
            existingRoom.RoomNumber = room.RoomNumber;
            existingRoom.RoomTypeID = room.RoomTypeID;

            _context.Entry(existingRoom).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Room/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
