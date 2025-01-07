using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class EmployeeScheduleContext : DbContext
    {
        public EmployeeScheduleContext(DbContextOptions<EmployeeScheduleContext> options) : base(options) { }

        public DbSet<EmployeeSchedule> EmployeeSchedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeSchedule>().ToTable("EmployeeSchedule"); // Map to the correct table name
        }
    }
}
