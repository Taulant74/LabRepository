using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class MenuContext : DbContext
    {
        public MenuContext(DbContextOptions<MenuContext> options) : base(options)
        {
        }

        public DbSet<Menu> Menus { get; set; }      // DbSet for Menu

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Just points to dbo.Menu.
            modelBuilder.Entity<Menu>().ToTable("Menu");
        }
    }
}
