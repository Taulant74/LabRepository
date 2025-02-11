using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Gym")]
    public class Gym
    {
        public int GymID { get; set; }
        public int AmenityID { get; set; }
        public int NumberOfMachines { get; set; }
        public bool Open24Hours { get; set; }

    }
}