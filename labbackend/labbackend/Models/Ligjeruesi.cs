using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{

    [Table("Ligjeruesi")]
    public class Ligjeruesi
    {
        [Key]
        public int LecturerID { get; set; }

        [Required]
        public string Emri { get; set; }

        public string Departamenti { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }
        
    }

}
