
using Microsoft.EntityFrameworkCore;


namespace labbackend.Models
{
    public class AmenityContext : DbContext
    {
        public AmenityContext(DbContextOptions<AmenityContext> options) : base(options)
        {
        }

        public DbSet<Amenity> Amenities { get; set; }
    }

}