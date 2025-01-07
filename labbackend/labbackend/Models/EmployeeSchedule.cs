using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("EmployeeSchedule")]
    public class EmployeeSchedule
    {
        [Key]
        public int ScheduleID { get; set; }

        [Required] // Ensure StaffID is required
        public int StaffID { get; set; }

        [Required] // Ensure Date is required
        public DateTime Date { get; set; }

        [Required] // Ensure StartTime is required
        public TimeSpan StartTime { get; set; }

        [Required] // Ensure EndTime is required
        public TimeSpan EndTime { get; set; }
    }
}
