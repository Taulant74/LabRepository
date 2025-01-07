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
    public class EmployeeScheduleController : ControllerBase
    {
        private readonly EmployeeScheduleContext _context;

        public EmployeeScheduleController(EmployeeScheduleContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeSchedule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeSchedule>>> GetEmployeeSchedules()
        {
            return await _context.EmployeeSchedules.ToListAsync();
        }

        // GET: api/EmployeeSchedule/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeSchedule>> GetEmployeeSchedule(int id)
        {
            var schedule = await _context.EmployeeSchedules.FindAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return schedule;
        }

        // POST: api/EmployeeSchedule
        [HttpPost]
        public async Task<ActionResult<EmployeeSchedule>> CreateEmployeeSchedule([FromBody] EmployeeSchedule employeeSchedule)
        {
            // Validate the incoming data
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Add to the database
            _context.EmployeeSchedules.Add(employeeSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployeeSchedule), new { id = employeeSchedule.ScheduleID }, employeeSchedule);
        }

        // PUT: api/EmployeeSchedule/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployeeSchedule(int id, [FromBody] EmployeeSchedule employeeSchedule)
        {
            if (id != employeeSchedule.ScheduleID)
            {
                return BadRequest(new { error = "ScheduleID mismatch" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(employeeSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeScheduleExists(id))
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

        // DELETE: api/EmployeeSchedule/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeSchedule(int id)
        {
            var schedule = await _context.EmployeeSchedules.FindAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }

            _context.EmployeeSchedules.Remove(schedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeScheduleExists(int id)
        {
            return _context.EmployeeSchedules.Any(e => e.ScheduleID == id);
        }
    }
}
