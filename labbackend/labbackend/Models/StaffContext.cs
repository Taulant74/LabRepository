using backendLab.Models;
using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class StaffContext : DbContext
    {
        public StaffContext(DbContextOptions<StaffContext> options) : base(options)
        {
        }

        public DbSet<Staff> Staffs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Staff>().ToTable("Staff"); // Map to the correct table name
        }
    }
}
