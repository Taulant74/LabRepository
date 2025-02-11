using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Event")]
    public class Event
    {
        public int EventID { get; set; }
        public int HotelID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
