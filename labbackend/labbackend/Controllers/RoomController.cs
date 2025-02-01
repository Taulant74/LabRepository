using Microsoft.AspNetCore.Mvc;
using labbackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomContext _roomContext;
        private readonly GuestContext _guestContext;

        public RoomController(RoomContext roomContext, GuestContext guestContext)
        {
            _roomContext = roomContext;
            _guestContext = guestContext;
        }

        // GET: api/Room
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _roomContext.Rooms
                .Include(r => r.OccupiedByGuest) // Include guest details
                .Select(r => new
                {
                    r.RoomID,
                    r.HotelID,
                    r.RoomNumber,
                    r.RoomTypeID,
                    r.OccupiedByGuestID,
                    OccupiedByGuest = r.OccupiedByGuest != null ? new
                    {
                        r.OccupiedByGuest.GuestID,
                        r.OccupiedByGuest.FirstName,
                        r.OccupiedByGuest.LastName,
                        r.OccupiedByGuest.Email,
                        r.OccupiedByGuest.Phone,
                        r.OccupiedByGuest.Passi,
                        r.OccupiedByGuest.Role
                    } : null
                })
                .ToListAsync();

            return Ok(rooms);
        }

        // POST: api/Room
        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate that the guest exists if `OccupiedByGuestID` is provided
            if (room.OccupiedByGuestID.HasValue)
            {
                var guestExists = await _guestContext.Guests.AnyAsync(g => g.GuestID == room.OccupiedByGuestID.Value);
                if (!guestExists)
                {
                    return NotFound(new { message = "Guest not found." });
                }
            }

            // Add the room
            _roomContext.Rooms.Add(room);
            await _roomContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRooms), new { id = room.RoomID }, room);
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

            var existingRoom = await _roomContext.Rooms.FindAsync(id);
            if (existingRoom == null)
            {
                return NotFound();
            }

            existingRoom.HotelID = room.HotelID;
            existingRoom.RoomNumber = room.RoomNumber;
            existingRoom.RoomTypeID = room.RoomTypeID;
            existingRoom.OccupiedByGuestID = room.OccupiedByGuestID;

            _roomContext.Entry(existingRoom).State = EntityState.Modified;
            await _roomContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Room/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _roomContext.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _roomContext.Rooms.Remove(room);
            await _roomContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
