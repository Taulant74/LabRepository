using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using labbackend.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly GuestContext _context;
        private readonly IConfiguration _config;

        public GuestController(GuestContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // Generate JWT Token
        private string GenerateJwtToken(Guest user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("role", user.Role ?? "User"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Generate Refresh Token
        private string GenerateRefreshToken()
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        }

        // POST: api/Guest/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Passi))
                return BadRequest(new { message = "Email and password are required." });

            var user = _context.Guests.FirstOrDefault(g => g.Email == loginRequest.Email && g.Passi == loginRequest.Passi);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            // Set the refresh token in HttpOnly cookie
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(2)  // <-- 2 minutes
            });


            return Ok(new
            {
                token,
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

        // POST: api/Guest/refresh-token
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized(new { message = "Refresh token is missing." });

            // Normally you'd validate the refresh token from a database
            var user = _context.Guests.FirstOrDefault(); // Simplified for example
            if (user == null)
                return Unauthorized(new { message = "Invalid refresh token." });

            var newToken = GenerateJwtToken(user);
            return Ok(new { token = newToken });
        }

        // GET: api/Guest/{id}
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


        // PUT: api/Guest/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateGuest(int id, [FromBody] Guest updatedGuest)
        {
            var guest = _context.Guests.FirstOrDefault(g => g.GuestID == id);
            if (guest == null)
                return NotFound(new { message = "Guest not found." });

            guest.FirstName = updatedGuest.FirstName ?? guest.FirstName;
            guest.LastName = updatedGuest.LastName ?? guest.LastName;
            guest.Email = updatedGuest.Email ?? guest.Email;
            guest.Phone = updatedGuest.Phone ?? guest.Phone;
            guest.Passi = updatedGuest.Passi ?? guest.Passi;
            if (!string.IsNullOrEmpty(updatedGuest.Role))
                guest.Role = updatedGuest.Role;

            _context.SaveChanges();

            return Ok(new { message = "Guest updated successfully.", guest });
        }
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<Guest> GetGuest(int id)
        {
            var guest = _context.Guests.FirstOrDefault(g => g.GuestID == id);
            if (guest == null)
                return NotFound(new { message = "Guest not found." });

            return Ok(new
            {
                guest.GuestID,
                guest.FirstName,
                guest.LastName,
                guest.Email,
                guest.Phone,
                guest.Role
            });
        }
        [HttpPost]
        public IActionResult AddGuest([FromBody] Guest newGuest)
        {
            // Example: Check if email already exists
            var existingGuest = _context.Guests.FirstOrDefault(g => g.Email == newGuest.Email);
            if (existingGuest != null)
            {
                return Conflict(new { message = "Email already registered." });
            }

            // Optional: Validate fields (e.g., require non-empty names, etc.)
            if (string.IsNullOrEmpty(newGuest.FirstName) ||
                string.IsNullOrEmpty(newGuest.LastName) ||
                string.IsNullOrEmpty(newGuest.Email) ||
                string.IsNullOrEmpty(newGuest.Passi))
            {
                return BadRequest(new { message = "All fields are required." });
            }

            // Assign default role if you want
            // newGuest.Role = "User";

            _context.Guests.Add(newGuest);
            _context.SaveChanges();

            // Return the newly created guest 
            return CreatedAtAction(nameof(GetGuest), new { id = newGuest.GuestID }, newGuest);
        }

        // DELETE: api/Guest/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteGuest(int id)
        {
            var guest = _context.Guests.FirstOrDefault(g => g.GuestID == id);
            if (guest == null)
                return NotFound(new { message = "Guest not found." });

            _context.Guests.Remove(guest);
            _context.SaveChanges();

            return Ok(new { message = "Guest deleted successfully." });
        }
    }
}
