using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using labbackend.Models;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public GuestController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Guest>>> Get()
        {
            string query = "SELECT GuestID, FirstName, LastName, Email, Phone ,Passi FROM dbo.Guest";

            List<Guest> guests = new List<Guest>();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                SqlCommand command = new SqlCommand(query, connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Guest guest = new Guest
                    {
                        GuestID = reader.GetInt32(0),
                        FirstName = reader.GetString(1),
                        LastName = reader.GetString(2),
                        Email = reader.GetString(3),
                        Phone = reader.GetString(4),
                        Passi = reader.GetString(5)

                    };

                    guests.Add(guest);
                }

                await reader.CloseAsync();
                await connection.CloseAsync();
            }

            return Ok(guests);
        }

        [HttpPost]
        public async Task<IActionResult> PostGuest(Guest guest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                await connection.OpenAsync();

                // Check for existing email
                string checkEmailQuery = "SELECT COUNT(*) FROM Guest WHERE Email = @Email";
                using (SqlCommand checkEmailCmd = new SqlCommand(checkEmailQuery, connection))
                {
                    checkEmailCmd.Parameters.AddWithValue("@Email", guest.Email);
                    int emailCount = (int)await checkEmailCmd.ExecuteScalarAsync();
                    if (emailCount > 0)
                    {
                        return BadRequest(new { Field = "Email", Message = "This email is already in use." });
                    }
                }

                // Check for existing phone
                string checkPhoneQuery = "SELECT COUNT(*) FROM Guest WHERE Phone = @Phone";
                using (SqlCommand checkPhoneCmd = new SqlCommand(checkPhoneQuery, connection))
                {
                    checkPhoneCmd.Parameters.AddWithValue("@Phone", guest.Phone);
                    int phoneCount = (int)await checkPhoneCmd.ExecuteScalarAsync();
                    if (phoneCount > 0)
                    {
                        return BadRequest(new { Field = "Phone", Message = "This phone number is already in use." });
                    }
                }

                // Validate password length
                if (guest.Passi == null || guest.Passi.Length < 8)
                {
                    return BadRequest(new { Field = "Password", Message = "Password must be at least 8 characters long." });
                }

                // Insert the guest into the database
                string insertQuery = @"
            INSERT INTO Guest (GuestID, FirstName, LastName, Email, Phone, Passi)
            VALUES (@GuestID, @FirstName, @LastName, @Email, @Phone, @Passi);";

                using (SqlCommand insertCmd = new SqlCommand(insertQuery, connection))
                {
                    if (guest.GuestID == null)
                    {
                        return BadRequest(new { Field = "GuestID", Message = "Guest ID is required." });
                    }

                    insertCmd.Parameters.AddWithValue("@GuestID", guest.GuestID);
                    insertCmd.Parameters.AddWithValue("@FirstName", guest.FirstName ?? (object)DBNull.Value);
                    insertCmd.Parameters.AddWithValue("@LastName", guest.LastName ?? (object)DBNull.Value);
                    insertCmd.Parameters.AddWithValue("@Email", guest.Email ?? (object)DBNull.Value);
                    insertCmd.Parameters.AddWithValue("@Phone", guest.Phone ?? (object)DBNull.Value);
                    insertCmd.Parameters.AddWithValue("@Passi", guest.Passi ?? (object)DBNull.Value);

                    await insertCmd.ExecuteNonQueryAsync();
                }
            }

            return Ok(new { Message = "Guest added successfully." });
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuest(int id, Guest guest)
        {
            if (id != guest.GuestID)
            {
                return BadRequest("Guest ID mismatch");
            }

            string query = @"
        UPDATE Guest
        SET FirstName = @FirstName, LastName = @LastName, Email = @Email, Phone = @Phone , Passi = @Passi
        WHERE GuestID = @GuestID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@GuestID", guest.GuestID);
                command.Parameters.AddWithValue("@FirstName", guest.FirstName);
                command.Parameters.AddWithValue("@LastName", guest.LastName);
                command.Parameters.AddWithValue("@Email", guest.Email);
                command.Parameters.AddWithValue("@Phone", guest.Phone);
                command.Parameters.AddWithValue("@Passi", guest.Passi);


                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }

            return new JsonResult("Updated Successfully");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(Guest guest)
        {
            string query = "SELECT COUNT(*) FROM dbo.Guest WHERE Email = @Email AND Passi = @Passi";

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Email", guest.Email);
                command.Parameters.AddWithValue("@Passi", guest.Passi);

                await connection.OpenAsync();
                int count = (int)await command.ExecuteScalarAsync();
                if (count > 0)
                {
                    return Ok("Login successful");
                }
                else
                {
                    return Unauthorized("Invalid credentials");
                }
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGuest(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();

                    // Delete dependent Feedback rows first
                    string deleteFeedbackQuery = "DELETE FROM Feedback WHERE GuestID = @GuestID";
                    using (SqlCommand deleteFeedbackCommand = new SqlCommand(deleteFeedbackQuery, connection))
                    {
                        deleteFeedbackCommand.Parameters.AddWithValue("@GuestID", id);
                        await deleteFeedbackCommand.ExecuteNonQueryAsync();
                    }

                    // Then delete the Guest
                    string deleteGuestQuery = "DELETE FROM Guest WHERE GuestID = @GuestID";
                    using (SqlCommand deleteGuestCommand = new SqlCommand(deleteGuestQuery, connection))
                    {
                        deleteGuestCommand.Parameters.AddWithValue("@GuestID", id);
                        int rowsAffected = await deleteGuestCommand.ExecuteNonQueryAsync();

                        if (rowsAffected == 0)
                        {
                            return NotFound(new { Message = "Guest not found." });
                        }
                    }
                }

                return Ok(new { Message = "Guest deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Error = ex.Message });
            }
        }


    }

}
