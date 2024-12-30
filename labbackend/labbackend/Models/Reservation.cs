namespace labbackend.Models
{
    public class Reservation
    {
        public int ReservationID { get; set; }
        public int GuestID { get; set; }
        public int HotelID { get; set; }
        public int RoomID { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public decimal TotalPrice { get; set; }

        // Constructor to ensure ReservationID is set
        public Reservation()
        {
            if (ReservationID == 0)
            {
                ReservationID = GenerateReservationID();
            }
        }

        private static int GenerateReservationID()
        {
            // Generate a pseudo-unique ReservationID (ensure this aligns with your database constraints)
            return new Random().Next(1, int.MaxValue);
        }
    }
}
