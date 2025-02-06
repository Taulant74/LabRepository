using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("RoomType")]
    public class RoomType
    {
        public int RoomTypeID { get; set; }
        public string TypeName { get; set; } = string.Empty;  // Initialize with default value
        public decimal PricePerNight { get; set; }
        public string? Description { get; set; }  // Mark as nullable (because not all room types might have a description)
    }
}
