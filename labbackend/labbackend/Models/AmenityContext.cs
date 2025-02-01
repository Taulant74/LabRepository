
using Microsoft.EntityFrameworkCore;


namespace labbackend.Models
{
    public class AmenityContext : DbContext
    {
        public AmenityContext(DbContextOptions<AmenityContext> options) : base(options)
        {
        }

        public DbSet<Amenity> Amenities { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Amenity>().ToTable("Amenities"); // Map to the correct table name
        }
    }

}