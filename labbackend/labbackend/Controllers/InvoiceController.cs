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
    public class InvoiceController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public InvoiceController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> Get()
        {
            string query = @"SELECT InvoiceID, ReservationID, Amount FROM dbo.Invoice";

            List<Invoice> invoices = new List<Invoice>();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                SqlCommand command = new SqlCommand(query, connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Invoice invoice = new Invoice
                    {
                        InvoiceID = reader.GetInt32(0),
                        ReservationID = reader.GetInt32(1),
                        Amount = reader.GetDecimal(2)
                    };
                    invoices.Add(invoice);
                }

                await reader.CloseAsync();
                await connection.CloseAsync();
            }

            return Ok(invoices);
        }

        [HttpPost]
        public async Task<IActionResult> PostInvoice(Invoice invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // 1. Generate a unique InvoiceID
            invoice.InvoiceID = GenerateUniqueInvoiceID();

            // 2. Insert into the database
            string query = @"INSERT INTO Invoice (InvoiceID, ReservationID, Amount)
                             VALUES (@InvoiceID, @ReservationID, @Amount);";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@InvoiceID", invoice.InvoiceID);
                command.Parameters.AddWithValue("@ReservationID", invoice.ReservationID);
                command.Parameters.AddWithValue("@Amount", invoice.Amount);

                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }

            // 3. Return JSON including new InvoiceID
            return Ok(new
            {
                message = "Invoice added successfully.",
                invoiceID = invoice.InvoiceID
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.InvoiceID)
            {
                return BadRequest("Invoice ID mismatch");
            }

            string query = @"UPDATE Invoice
                             SET ReservationID = @ReservationID,
                                 Amount = @Amount
                             WHERE InvoiceID = @InvoiceID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@InvoiceID", invoice.InvoiceID);
                command.Parameters.AddWithValue("@ReservationID", invoice.ReservationID);
                command.Parameters.AddWithValue("@Amount", invoice.Amount);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }

            return Ok("Invoice updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            string query = "DELETE FROM Invoice WHERE InvoiceID = @InvoiceID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@InvoiceID", id);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }

            return Ok("Invoice deleted successfully");
        }

        private int GenerateUniqueInvoiceID()
        {
            // Generate a pseudo-unique ID for the InvoiceID (customize as needed)
            return new Random().Next(1, int.MaxValue);
        }
    }
}
