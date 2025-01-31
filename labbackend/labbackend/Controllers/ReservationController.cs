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
            string query = @"SELECT ReservationID, GuestID, HotelID, RoomID, CheckInDate, CheckOutDate, TotalPrice 
                             FROM dbo.Reservation";

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

            // 1. Check for room availability
            if (await IsRoomBooked(reservation.RoomID, reservation.CheckInDate, reservation.CheckOutDate))
            {
                return BadRequest("The room is already booked for the selected dates.");
            }

            // 2. Generate a unique ReservationID
            reservation.ReservationID = GenerateUniqueReservationID();

            // 3. Insert into the database
            string query = @"INSERT INTO Reservation 
                             (ReservationID, GuestID, HotelID, RoomID, CheckInDate, CheckOutDate, TotalPrice)
                             VALUES
                             (@ReservationID, @GuestID, @HotelID, @RoomID, @CheckInDate, @CheckOutDate, @TotalPrice);";

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

            // 4. Return JSON including new ReservationID
            return Ok(new
            {
                message = "Reservation added successfully.",
                reservationID = reservation.ReservationID
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.ReservationID)
            {
                return BadRequest("Reservation ID mismatch");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for room availability, excluding the current reservation being updated
            if (await IsRoomBooked(reservation.RoomID, reservation.CheckInDate, reservation.CheckOutDate, id))
            {
                return BadRequest("The room is already booked for the selected dates.");
            }

            string query = @"UPDATE Reservation
                             SET GuestID = @GuestID,
                                 HotelID = @HotelID,
                                 RoomID = @RoomID,
                                 CheckInDate = @CheckInDate,
                                 CheckOutDate = @CheckOutDate,
                                 TotalPrice = @TotalPrice
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

            return Ok("Reservation updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            string connectionString = _configuration.GetConnectionString("DefaultConnection");

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    await conn.OpenAsync();

                    // 1️⃣ Delete related invoices first (to avoid FK constraint issue)
                    string deleteInvoicesQuery = "DELETE FROM Invoice WHERE ReservationID = @ReservationID";
                    using (SqlCommand cmdInvoices = new SqlCommand(deleteInvoicesQuery, conn))
                    {
                        cmdInvoices.Parameters.AddWithValue("@ReservationID", id);
                        await cmdInvoices.ExecuteNonQueryAsync();
                    }

                    // 2️⃣ Now delete the reservation
                    string deleteReservationQuery = "DELETE FROM Reservation WHERE ReservationID = @ReservationID";
                    using (SqlCommand cmdReservation = new SqlCommand(deleteReservationQuery, conn))
                    {
                        cmdReservation.Parameters.AddWithValue("@ReservationID", id);
                        int rowsAffected = await cmdReservation.ExecuteNonQueryAsync();

                        if (rowsAffected == 0)
                        {
                            return NotFound("Reservation not found.");
                        }
                    }
                }

                return Ok("Reservation deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // --- Helper Methods ---

        private async Task<bool> IsRoomBooked(int roomId, DateTime checkInDate, DateTime checkOutDate, int? excludeReservationId = null)
        {
            string query = @"
                SELECT COUNT(1)
                FROM Reservation
                WHERE RoomID = @RoomID
                  AND @CheckOutDate > CheckInDate
                  AND @CheckInDate < CheckOutDate
            ";

            if (excludeReservationId.HasValue)
            {
                query += " AND ReservationID != @ExcludeReservationID";
            }

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@RoomID", roomId);
                command.Parameters.AddWithValue("@CheckInDate", checkInDate);
                command.Parameters.AddWithValue("@CheckOutDate", checkOutDate);

                if (excludeReservationId.HasValue)
                {
                    command.Parameters.AddWithValue("@ExcludeReservationID", excludeReservationId.Value);
                }

                await connection.OpenAsync();
                int count = (int)await command.ExecuteScalarAsync();
                return count > 0;
            }
        }

        private int GenerateUniqueReservationID()
        {
            // Generate a pseudo-unique ReservationID (ensure this aligns with DB constraints)
            return new Random().Next(1, int.MaxValue);
        }
    }
}
