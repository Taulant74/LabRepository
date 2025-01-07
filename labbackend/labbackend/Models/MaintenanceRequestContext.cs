using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class MaintenanceRequestContext : DbContext
    {
        public MaintenanceRequestContext(DbContextOptions<MaintenanceRequestContext> options)
            : base(options)
        {
        }

        // Define the DbSet for MaintenanceRequest
        public DbSet<MaintenanceRequest> MaintenanceRequests { get; set; }

        // Configure the model using OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Explicitly map the MaintenanceRequest entity to the table
            modelBuilder.Entity<MaintenanceRequest>()
                .ToTable("MaintenanceRequest")
                .HasKey(m => m.RequestID); // Explicitly set RequestID as the primary key

            // Optional: Further configure properties if needed
            modelBuilder.Entity<MaintenanceRequest>()
                .Property(m => m.Description)
                .HasMaxLength(255)
                .IsRequired(false);

            modelBuilder.Entity<MaintenanceRequest>()
                .Property(m => m.Status)
                .HasMaxLength(20)
                .IsRequired(false);

            // Other configurations can be added here if needed
        }
    }
}
