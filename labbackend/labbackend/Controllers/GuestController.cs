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

            string query = @"
                INSERT INTO Guest (GuestID, FirstName, LastName, Email, Phone, Passi)
                VALUES (@GuestID, @FirstName, @LastName, @Email, @Phone,@Passi);";

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
                await command.ExecuteNonQueryAsync();
            }

            return new JsonResult("Added Succesfully");
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
            string query = "DELETE FROM Guest WHERE GuestID = @GuestID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@GuestID", id);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }


            return new JsonResult("Deleted Succesfully");
        }
    }

}
