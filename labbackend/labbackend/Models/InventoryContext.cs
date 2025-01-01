using backendLab.Models;
using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{

    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options) : base(options)
        {
        }

        public DbSet<Inventory> Inventories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Inventory>().ToTable("Inventory"); // Map to the correct table name
        }
    }
    }
