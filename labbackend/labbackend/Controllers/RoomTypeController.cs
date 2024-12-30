using Microsoft.AspNetCore.Mvc;
using labbackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypeController : ControllerBase
    {
        private readonly RoomTypeContext _context;

        // Constructor to inject the RoomTypeContext dependency
        public RoomTypeController(RoomTypeContext context)
        {
            _context = context;
        }

        // GET: api/RoomType
        [HttpGet]
        public async Task<IActionResult> GetRoomTypes()
        {
            var roomTypes = await _context.RoomTypes.ToListAsync();
            return Ok(roomTypes);
        }

        // GET: api/RoomType/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomType(int id)
        {
            var roomType = await _context.RoomTypes.FirstOrDefaultAsync(rt => rt.RoomTypeID == id);

            if (roomType == null)
            {
                return NotFound();
            }

            return Ok(roomType);
        }

        // POST: api/RoomType
        [HttpPost]
        public async Task<IActionResult> CreateRoomType([FromBody] RoomType roomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RoomTypes.Add(roomType);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomType), new { id = roomType.RoomTypeID }, roomType);
        }

        // PUT: api/RoomType/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomType(int id, [FromBody] RoomType roomType)
        {
            if (id != roomType.RoomTypeID)
            {
                return BadRequest("RoomType ID mismatch");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingRoomType = await _context.RoomTypes.FindAsync(id);
            if (existingRoomType == null)
            {
                return NotFound();
            }

            existingRoomType.TypeName = roomType.TypeName;
            existingRoomType.Description = roomType.Description;
            existingRoomType.PricePerNight = roomType.PricePerNight; // Ensure PricePerNight is updated

            _context.Entry(existingRoomType).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/RoomType/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null)
            {
                return NotFound();
            }

            _context.RoomTypes.Remove(roomType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
