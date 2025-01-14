using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class GuestContext : DbContext
    {
        public GuestContext(DbContextOptions<GuestContext> options) : base(options)
        {
        }

        public DbSet<Guest> Guests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Guest>().ToTable("Guest");

            // Ensure the Role column defaults to "User" if not specified
            modelBuilder.Entity<Guest>()
                .Property(g => g.Role)
                .HasDefaultValue("User");
        }
    }
}
