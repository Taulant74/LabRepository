﻿using labbackend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Spa")]
    public class Spa
    {
        public int SpaID { get; set; }
        public int AmenityID { get; set; }
        public int NumberOfRooms { get; set; }
        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }

        [Required] // Assuming this is the missing required field
        public string SpaName { get; set; }
    }

}



