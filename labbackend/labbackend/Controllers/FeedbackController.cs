using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using labbackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackContext _context;

        public FeedbackController(FeedbackContext context)
        {
            _context = context;
        }

        // GET: api/feedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacks()
        {
            // Retrieve all feedback entries
            return await _context.Feedbacks.ToListAsync();
        }

        // GET: api/feedback/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedback(int id)
        {
            // Retrieve a specific feedback entry by its ID
            var feedback = await _context.Feedbacks.FindAsync(id);

            if (feedback == null)
            {
                return NotFound(); // Return 404 if not found
            }

            return feedback;
        }

        // POST: api/feedback
        [HttpPost]
        public async Task<ActionResult<Feedback>> PostFeedback(Feedback feedback)
        {
            if (feedback == null)
            {
                return BadRequest("Feedback object is null.");
            }
            if (string.IsNullOrEmpty(feedback.FeedbackType) ||
                string.IsNullOrEmpty(feedback.Message))
            {
                return BadRequest("Some required fields are missing.");
            }

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeedback", new { id = feedback.FeedbackID }, feedback);
        }

        // PUT: api/feedback/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedback(int id, Feedback feedback)
        {
            if (id != feedback.FeedbackID)
            {
                return BadRequest("Feedback ID mismatch.");
            }

            _context.Entry(feedback).State = EntityState.Modified; // Mark feedback as modified

            try
            {
                await _context.SaveChangesAsync(); // Save the changes to the database
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedbackExists(id)) // Check if the feedback exists
                {
                    return NotFound(); // Return 404 if not found
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Return 204 No Content for successful update
        }

        // DELETE: api/feedback/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Feedback>> DeleteFeedback(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null)
            {
                return NotFound(); // Return 404 if feedback not found
            }

            _context.Feedbacks.Remove(feedback); // Remove the feedback from the database
            await _context.SaveChangesAsync(); // Save the changes

            return feedback; // Return the deleted feedback
        }

        // Helper method to check if feedback exists
        private bool FeedbackExists(int id)
        {
            return _context.Feedbacks.Any(e => e.FeedbackID == id);
        }
    }
}
