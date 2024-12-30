using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using labbackend.Models;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PaymentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Get Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> Get()
        {
            string query = @"SELECT PaymentID, InvoiceID, Amount, PaymentDate FROM dbo.Payment";

            List<Payment> payments = new List<Payment>();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                SqlCommand command = new SqlCommand(query, connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Payment payment = new Payment
                    {
                        PaymentID = reader.GetInt32(0),
                        InvoiceID = reader.GetInt32(1),
                        Amount = reader.GetDecimal(2),
                        PaymentDate = reader.GetDateTime(3)
                    };

                    payments.Add(payment);
                }

                await reader.CloseAsync();
                await connection.CloseAsync();
            }

            return Ok(payments);
        }

        // Create Payment (Post)
        [HttpPost]
        public async Task<IActionResult> PostPayment([FromBody] Payment payment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Generate a unique PaymentID
            payment.PaymentID = GenerateUniquePaymentID();

            string query = @"INSERT INTO Payment (PaymentID, InvoiceID, Amount, PaymentDate)
                             VALUES (@PaymentID, @InvoiceID, @Amount, @PaymentDate);";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@PaymentID", payment.PaymentID);
                command.Parameters.AddWithValue("@InvoiceID", payment.InvoiceID);
                command.Parameters.AddWithValue("@Amount", payment.Amount);
                command.Parameters.AddWithValue("@PaymentDate", payment.PaymentDate);

                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }

            return new JsonResult("Added Successfully");
        }

        // Update Payment (Put)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(int id, [FromBody] Payment payment)
        {
            if (id != payment.PaymentID)
            {
                return BadRequest("Payment ID mismatch");
            }

            string query = @"UPDATE Payment
                             SET InvoiceID = @InvoiceID, Amount = @Amount, PaymentDate = @PaymentDate
                             WHERE PaymentID = @PaymentID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@PaymentID", payment.PaymentID);
                command.Parameters.AddWithValue("@InvoiceID", payment.InvoiceID);
                command.Parameters.AddWithValue("@Amount", payment.Amount);
                command.Parameters.AddWithValue("@PaymentDate", payment.PaymentDate);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        // Delete Payment
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            string query = "DELETE FROM Payment WHERE PaymentID = @PaymentID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@PaymentID", id);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        // Helper: Generate unique PaymentID
        private int GenerateUniquePaymentID()
        {
            // Generate a pseudo-unique ID for the PaymentID (customize as needed)
            return new Random().Next(1, int.MaxValue);
        }
    }
}
