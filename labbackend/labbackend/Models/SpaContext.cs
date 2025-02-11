using backendLab.Models;
using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{

    public class SpaContext : DbContext
    {
        public SpaContext(DbContextOptions<SpaContext> options) : base(options)
        {
        }

        public DbSet<Spa> Spas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Spa>().ToTable("Spa"); // Map to the correct table name
        }
    }
}