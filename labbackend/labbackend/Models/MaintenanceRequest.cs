using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("MaintenanceRequest")]
    public class MaintenanceRequest
    {
        [Key] // Explicitly mark as primary key
        public int RequestID { get; set; }
        public int HotelID { get; set; }
        public string Description { get; set; }
        public DateTime RequestDate { get; set; }
        public int Priority { get; set; }
        public string Status { get; set; }
    }
}
