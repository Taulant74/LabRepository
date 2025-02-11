using backendLab.Models;
using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{

    public class SaunaContext : DbContext
    {
        public SaunaContext(DbContextOptions<SaunaContext> options) : base(options)
        {
        }

        public DbSet<Sauna> Saunas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sauna>().ToTable("Sauna"); // Map to the correct table name
        }
    }
}