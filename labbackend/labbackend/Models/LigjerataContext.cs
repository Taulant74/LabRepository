using Microsoft.EntityFrameworkCore;
namespace labbackend.Models
{
    public class LigjerataContext : DbContext
    {
        public LigjerataContext(DbContextOptions<LigjerataContext> options) : base(options) { }

        public DbSet<Ligjerata> Ligjeratat { get; set; }
    }

}
