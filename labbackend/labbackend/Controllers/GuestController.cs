using Microsoft.AspNetCore.Mvc;
using labbackend.Models;
using System.Linq;
using System.Collections.Generic;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly GuestContext _context;

        public GuestController(GuestContext context)
        {
            _context = context;
        }

        // GET: api/Guest
        [HttpGet]
        public ActionResult<IEnumerable<Guest>> GetGuests()
        {
            var guests = _context.Guests
                .Select(g => new Guest
                {
                    GuestID = g.GuestID,
                    FirstName = g.FirstName ?? "N/A",  // Default value
                    LastName = g.LastName ?? "N/A",   // Default value
                    Email = g.Email ?? "unknown@example.com", // Default value
                    Phone = g.Phone ?? "0000000000",  // Default value
                    Passi = g.Passi ?? "default",     // Default value
                    Role = g.Role ?? "User"           // Default value
                })
                .ToList();

            return Ok(guests);
        }

        // GET: api/Guest/{id}
        [HttpGet("{id}")]
        public ActionResult<Guest> GetGuest(int id)
        {
            var guest = _context.Guests.FirstOrDefault(g => g.GuestID == id);

            if (guest == null)
            {
                return NotFound(new { message = "Guest not found." });
            }

            return Ok(guest);
        }

        // POST: api/Guest
        [HttpPost]
        public ActionResult<Guest> AddGuest([FromBody] Guest newGuest)
        {
            if (string.IsNullOrEmpty(newGuest.FirstName) ||
                string.IsNullOrEmpty(newGuest.LastName) ||
                string.IsNullOrEmpty(newGuest.Email) ||
                string.IsNullOrEmpty(newGuest.Passi))
            {
                return BadRequest(new { message = "All fields are required." });
            }

            // Check if email already exists
            var existingGuest = _context.Guests.FirstOrDefault(g => g.Email == newGuest.Email);
            if (existingGuest != null)
            {
                return Conflict(new { message = "Email already exists." });
            }

            // Assign default role if not provided
            var totalGuests = _context.Guests.Count();
            newGuest.Role = totalGuests < 3 ? "Admin" : "User";

            _context.Guests.Add(newGuest);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetGuest), new { id = newGuest.GuestID }, newGuest);
        }

        // PUT: api/Guest/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateGuest(int id, [FromBody] Guest updatedGuest)
        {
            var guest = _context.Guests.FirstOrDefault(g => g.GuestID == id);

            if (guest == null)
            {
                return NotFound(new { message = "Guest not found." });
            }

            // Update fields only if the value is not null
            guest.FirstName = updatedGuest.FirstName ?? guest.FirstName;
            guest.LastName = updatedGuest.LastName ?? guest.LastName;
            guest.Email = updatedGuest.Email ?? guest.Email;
            guest.Phone = updatedGuest.Phone ?? guest.Phone;
            guest.Passi = updatedGuest.Passi ?? guest.Passi;

            // Update role only if provided and not null
            if (!string.IsNullOrEmpty(updatedGuest.Role))
            {
                guest.Role = updatedGuest.Role;
            }

            _context.SaveChanges();

            return Ok(new { message = "Guest updated successfully.", guest });
        }



        // DELETE: api/Guest/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteGuest(int id)
        {
            var guest = _context.Guests.FirstOrDefault(g => g.GuestID == id);

            if (guest == null)
            {
                return NotFound(new { message = "Guest not found." });
            }

            _context.Guests.Remove(guest);
            _context.SaveChanges();

            return Ok(new { message = "Guest deleted successfully." });
        }

        // POST: api/Guest/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                // Validate that email and password are provided
                if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Passi))
                {
                    return BadRequest(new { message = "Email and password are required." });
                }

                // Authenticate the user
                var user = _context.Guests
                    .FirstOrDefault(g => g.Email == loginRequest.Email && g.Passi == loginRequest.Passi);

                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid email or password." });
                }

                // Return the user details if authentication is successful
                return Ok(new
                {
                    message = "Login successful.",
                    user = new
                    {
                        user.GuestID,
                        user.FirstName,
                        user.LastName,
                        user.Email,
                        user.Phone,
                        user.Role
                    }
                });
            }
            catch (Exception ex)
            {
                // Log error and return a generic error response
                Console.WriteLine($"Error during login: {ex.Message}");
                return StatusCode(500, new { message = "An internal server error occurred." });
            }
        }
    }
}
