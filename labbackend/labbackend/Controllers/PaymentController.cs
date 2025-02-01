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

        // ✅ Create a Payment (POST)
        [HttpPost("make-payment")]
        public async Task<IActionResult> MakePayment([FromBody] Payment payment)
        {
            if (payment == null || payment.Amount <= 0)
            {
                return BadRequest("Invalid payment data.");
            }

            // Manually generate a PaymentID if required
            payment.PaymentID = new Random().Next(1, int.MaxValue);

            try
            {
                using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await conn.OpenAsync();

                    string query = @"
                INSERT INTO Payment (PaymentID, InvoiceID, Amount, PaymentDate)
                VALUES (@PaymentID, @InvoiceID, @Amount, GETDATE());";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@PaymentID", payment.PaymentID);
                        cmd.Parameters.AddWithValue("@InvoiceID", payment.InvoiceID);
                        cmd.Parameters.AddWithValue("@Amount", payment.Amount);

                        await cmd.ExecuteNonQueryAsync();
                    }
                }

                return Ok(new { message = "Payment successful.", paymentID = payment.PaymentID });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // ✅ Get Payments (GET)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            string query = @"SELECT PaymentID, InvoiceID, Amount, PaymentDate FROM dbo.Payment";
            List<Payment> payments = new List<Payment>();

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    SqlDataReader reader = await command.ExecuteReaderAsync();
                    while (await reader.ReadAsync())
                    {
                        payments.Add(new Payment
                        {
                            PaymentID = reader.GetInt32(0),
                            InvoiceID = reader.GetInt32(1),
                            Amount = reader.GetDecimal(2),
                            PaymentDate = reader.GetDateTime(3)
                        });
                    }
                }
            }

            return Ok(payments);
        }
    }
}
