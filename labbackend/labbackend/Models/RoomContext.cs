using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class RoomContext : DbContext
    {
        public RoomContext(DbContextOptions<RoomContext> options) : base(options)
        {
        }

        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>().ToTable("Room"); // Map to the correct table name

            // Explicitly define the relationship between Room and Guest
            modelBuilder.Entity<Room>()
                .HasOne(r => r.OccupiedByGuest) // Navigation property
                .WithMany() // A Guest can be associated with multiple rooms
                .HasForeignKey(r => r.OccupiedByGuestID) // Foreign key property
                .OnDelete(DeleteBehavior.SetNull); // Set the OccupiedByGuestID to NULL if the guest is deleted
        }
    }
}
