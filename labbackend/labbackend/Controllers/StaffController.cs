using Microsoft.AspNetCore.Mvc;
using labbackend.Models;
using backendLab.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly StaffContext _context;

        public StaffController(StaffContext context)
        {
            _context = context;
        }

        // GET: api/Staff
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffs()
        {
            return await _context.Staffs.ToListAsync();
        }

        // GET: api/Staff/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaff(int id)
        {
            var staff = await _context.Staffs.FindAsync(id);

            if (staff == null)
            {
                return NotFound();
            }

            return staff;
        }

        // POST: api/Staff
        [HttpPost]
        public async Task<ActionResult<Staff>> CreateStaff(Staff staff)
        {
            _context.Staffs.Add(staff);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStaff), new { id = staff.StaffID }, staff);
        }

        // PUT: api/Staff/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(int id, Staff staff)
        {
            if (id != staff.StaffID)
            {
                return BadRequest();
            }

            _context.Entry(staff).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(id))
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

        // DELETE: api/Staff/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staff = await _context.Staffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound();
            }

            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StaffExists(int id)
        {
            return _context.Staffs.Any(e => e.StaffID == id);
        }
    }
}
