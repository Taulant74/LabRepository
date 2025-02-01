using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace labbackend.Models
{
    [Table("Room")]
    public class Room
    {
        public int RoomID { get; set; }
        public int HotelID { get; set; }
        public int RoomNumber { get; set; }
        public int RoomTypeID { get; set; }
        public int? OccupiedByGuestID { get; set; } // Nullable if the room is available

        [ForeignKey("OccupiedByGuestID")]
        [JsonIgnore] // Ignore this property during POST/PUT
        public Guest? OccupiedByGuest { get; set; } // Navigation property
    }
}
