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
                return NotFound(new { message = "Schedule not found." });
            }

            return schedule;
        }

        // POST: api/EmployeeSchedule
        [HttpPost]
        public async Task<ActionResult<EmployeeSchedule>> CreateEmployeeSchedule([FromBody] EmployeeSchedule employeeSchedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure StartTime and EndTime have valid values
            employeeSchedule.StartTime ??= "09:00";
            employeeSchedule.EndTime ??= "17:00";

            // Do not set ScheduleID, let SQL handle it
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
                return BadRequest(new { error = "Schedule ID mismatch." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingSchedule = await _context.EmployeeSchedules.FindAsync(id);
            if (existingSchedule == null)
            {
                return NotFound(new { message = "Schedule not found." });
            }

            // Update fields only if new values are provided
            existingSchedule.StaffID = employeeSchedule.StaffID;
            existingSchedule.Date = employeeSchedule.Date;
            existingSchedule.StartTime = employeeSchedule.StartTime ?? existingSchedule.StartTime;
            existingSchedule.EndTime = employeeSchedule.EndTime ?? existingSchedule.EndTime;

            _context.Entry(existingSchedule).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Schedule updated successfully.", existingSchedule });
        }


        // DELETE: api/EmployeeSchedule/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeSchedule(int id)
        {
            var schedule = await _context.EmployeeSchedules.FindAsync(id);
            if (schedule == null)
            {
                return NotFound(new { message = "Schedule not found." });
            }

            _context.EmployeeSchedules.Remove(schedule);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Schedule deleted successfully." });
        }
    }
}
