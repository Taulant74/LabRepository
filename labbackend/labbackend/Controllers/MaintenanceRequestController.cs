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
    public class MaintenanceRequestController : ControllerBase
    {
        private readonly MaintenanceRequestContext _context;

        public MaintenanceRequestController(MaintenanceRequestContext context)
        {
            _context = context;
        }

        // GET: api/MaintenanceRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceRequest>>> GetMaintenanceRequests()
        {
            return await _context.MaintenanceRequests.ToListAsync();
        }

        // GET: api/MaintenanceRequest/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MaintenanceRequest>> GetMaintenanceRequest(int id)
        {
            var request = await _context.MaintenanceRequests.FindAsync(id);

            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // POST: api/MaintenanceRequest
        [HttpPost]
        public async Task<ActionResult<MaintenanceRequest>> CreateMaintenanceRequest(MaintenanceRequest maintenanceRequest)
        {
            _context.MaintenanceRequests.Add(maintenanceRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaintenanceRequest), new { id = maintenanceRequest.RequestID }, maintenanceRequest);
        }

        // PUT: api/MaintenanceRequest/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaintenanceRequest(int id, MaintenanceRequest maintenanceRequest)
        {
            if (id != maintenanceRequest.RequestID)
            {
                return BadRequest();
            }

            _context.Entry(maintenanceRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaintenanceRequestExists(id))
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

        // DELETE: api/MaintenanceRequest/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaintenanceRequest(int id)
        {
            var request = await _context.MaintenanceRequests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            _context.MaintenanceRequests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MaintenanceRequestExists(int id)
        {
            return _context.MaintenanceRequests.Any(e => e.RequestID == id);
        }
    }
}
