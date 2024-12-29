using System.ComponentModel.DataAnnotations.Schema;
using labbackend.Models;


namespace backendLab.Models
{
      [Table("EventBooking")] // Explicitly map to the correct table name
 
    public class Review
    {
        public int ReviewID { get; set; }
        public int HotelID { get; set; }
        public int GuestID { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime ReviewDate { get; set; }

      
    }
    

}