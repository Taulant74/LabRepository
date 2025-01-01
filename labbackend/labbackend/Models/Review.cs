using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Review")] // Explicitly map to the correct table name
    public class Review
    {
        public int? ReviewID { get; set; }
        public int? HotelID { get; set; } // Nullable Foreign Key
        public int? GuestID { get; set; } // Nullable Foreign Key
        public int? Rating { get; set; }  // Nullable field
        public string Comment { get; set; } // Nullable field
        public DateTime? ReviewDate { get; set; } // Nullable field
    }
}
