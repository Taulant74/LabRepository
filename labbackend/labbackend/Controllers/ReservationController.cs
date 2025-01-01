using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using labbackend.Models;

namespace labbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ReservationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> Get()
        {
            string query = @"SELECT ReservationID, GuestID, HotelID, RoomID, CheckInDate, CheckOutDate, TotalPrice FROM dbo.Reservation";

            List<Reservation> reservations = new List<Reservation>();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                SqlCommand command = new SqlCommand(query, connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Reservation reservation = new Reservation
                    {
                        ReservationID = reader.GetInt32(0),
                        GuestID = reader.GetInt32(1),
                        HotelID = reader.GetInt32(2),
                        RoomID = reader.GetInt32(3),
                        CheckInDate = reader.GetDateTime(4),
                        CheckOutDate = reader.GetDateTime(5),
                        TotalPrice = reader.GetDecimal(6)
                    };

                    reservations.Add(reservation);
                }

                await reader.CloseAsync();
                await connection.CloseAsync();
            }

            return Ok(reservations);
        }

        [HttpPost]
        public async Task<IActionResult> PostReservation(Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate RoomID before inserting
            if (!await DoesRoomExist(reservation.RoomID))
            {
                return BadRequest("The specified RoomID does not exist.");
            }

            // Generate a unique ReservationID
            reservation.ReservationID = GenerateUniqueReservationID();

            string query = @"INSERT INTO Reservation (ReservationID, GuestID, HotelID, RoomID, CheckInDate, CheckOutDate, TotalPrice)
                             VALUES (@ReservationID, @GuestID, @HotelID, @RoomID, @CheckInDate, @CheckOutDate, @TotalPrice);";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ReservationID", reservation.ReservationID);
                command.Parameters.AddWithValue("@GuestID", reservation.GuestID);
                command.Parameters.AddWithValue("@HotelID", reservation.HotelID);
                command.Parameters.AddWithValue("@RoomID", reservation.RoomID);
                command.Parameters.AddWithValue("@CheckInDate", reservation.CheckInDate);
                command.Parameters.AddWithValue("@CheckOutDate", reservation.CheckOutDate);
                command.Parameters.AddWithValue("@TotalPrice", reservation.TotalPrice);

                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.ReservationID)
            {
                return BadRequest("Reservation ID mismatch");
            }

            // Validate RoomID before updating
            if (!await DoesRoomExist(reservation.RoomID))
            {
                return BadRequest("The specified RoomID does not exist.");
            }

            string query = @"UPDATE Reservation
                             SET GuestID = @GuestID, HotelID = @HotelID, RoomID = @RoomID, 
                                 CheckInDate = @CheckInDate, CheckOutDate = @CheckOutDate, TotalPrice = @TotalPrice
                             WHERE ReservationID = @ReservationID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ReservationID", reservation.ReservationID);
                command.Parameters.AddWithValue("@GuestID", reservation.GuestID);
                command.Parameters.AddWithValue("@HotelID", reservation.HotelID);
                command.Parameters.AddWithValue("@RoomID", reservation.RoomID);
                command.Parameters.AddWithValue("@CheckInDate", reservation.CheckInDate);
                command.Parameters.AddWithValue("@CheckOutDate", reservation.CheckOutDate);
                command.Parameters.AddWithValue("@TotalPrice", reservation.TotalPrice);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            string query = "DELETE FROM Reservation WHERE ReservationID = @ReservationID;";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ReservationID", id);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        private async Task<bool> DoesRoomExist(int roomId)
        {
            string query = "SELECT COUNT(1) FROM Room WHERE RoomID = @RoomID;";
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@RoomID", roomId);

                await connection.OpenAsync();
                int count = (int)await command.ExecuteScalarAsync();
                return count > 0;
            }
        }

        private int GenerateUniqueReservationID()
        {
            // Generate a pseudo-unique ID for the ReservationID (customize as needed)
            return new Random().Next(1, int.MaxValue);
        }
    }
}
