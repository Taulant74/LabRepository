using backendLab.Models;
using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{

    public class GymContext : DbContext
    {
        public GymContext(DbContextOptions<GymContext> options) : base(options)
        {
        }

        public DbSet<Gym> Gyms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Gym>().ToTable("Gym"); // Map to the correct table name
        }
    }
}