using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Sauna")]
    public class Sauna
    {
        public int SaunaID { get; set; }
        public int AmenityID { get; set; }
        public decimal MaxTemperature { get; set; }
        public int Capacity { get; set; }

    }
}
