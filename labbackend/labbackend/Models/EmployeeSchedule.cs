using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("EmployeeSchedule")]
    public class EmployeeSchedule
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-increment
        public int ScheduleID { get; set; }

        [Required]
        public int StaffID { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(10)]
        public string StartTime { get; set; } = "09:00";  // Default

        [Required]
        [StringLength(10)]
        public string EndTime { get; set; } = "17:00";    // Default
    }
}
