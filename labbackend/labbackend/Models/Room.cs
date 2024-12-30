using System;

namespace labbackend.Models
{
    public class Room
    {
        public int RoomID { get; set; }
        public int HotelID { get; set; }
        public string RoomNumber { get; set; }
        public int RoomTypeID { get; set; }

        // Relationships
        //public Hotel Hotel { get; set; }
       // public RoomType RoomType { get; set; }
    }
}
