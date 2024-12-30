using labbackend.Models;
using Microsoft.EntityFrameworkCore;

roomcontext: using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class RoomContext : DbContext
    {
        public RoomContext(DbContextOptions<RoomContext> options) : base(options)
        {
        }

        public DbSet<Room> Rooms { get; set; }
    }

}