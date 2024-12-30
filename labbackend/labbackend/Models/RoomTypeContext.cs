using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class RoomTypeContext : DbContext
    {
        // DbSet to represent the RoomType entities
        public DbSet<RoomType> RoomTypes { get; set; }

        // Constructor to pass DbContextOptions to the base class
        public RoomTypeContext(DbContextOptions<RoomTypeContext> options) : base(options)
        {
        }
    }
}
