using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{

    [Table("Room")]
    public class Room
    {
        public int RoomID { get; set; }
        public int HotelID { get; set; }
        public int RoomNumber { get; set; }
        public int RoomTypeID { get; set; }
    }
}
