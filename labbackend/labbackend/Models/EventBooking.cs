using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("EventBooking")] // Explicitly map to the correct table name
    public class EventBooking
    {
        public int EventBookingID { get; set; }
        public int EventID { get; set; }
        public int GuestID { get; set; }
    }
}
