using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class RoomTypeContext : DbContext
    {
        public RoomTypeContext(DbContextOptions<RoomTypeContext> options) : base(options)
        {
        }

        public DbSet<RoomType> RoomTypes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoomType>().ToTable("RoomType"); // Map to the correct table name
        }
    }
}
