using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class EventBookingContext : DbContext
    {
        public EventBookingContext(DbContextOptions<EventBookingContext> options) : base(options) { }

        public DbSet<EventBooking> EventBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventBooking>().ToTable("EventBooking"); // Map to the correct table name
        }
    }
}
