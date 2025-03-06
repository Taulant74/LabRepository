using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Ligjerata")]
    public class Ligjerata
    {
        [Key]
        public int LectureID { get; set; }

        [Required]
        public string LectureName { get; set; }

        // Foreign Key
        public int LecturerID { get; set; }

        // Navigation Property
     
    }

}
