using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{

    [Table("Amenities")]
    public class Amenity
    {
        public int AmenityID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }

}
