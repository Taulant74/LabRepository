
using Microsoft.EntityFrameworkCore;
namespace labbackend.Models
{


    public class LigjeruesiContext : DbContext
    {
        public LigjeruesiContext(DbContextOptions<LigjeruesiContext> options) : base(options) { }

        public DbSet<Ligjeruesi> Ligjeruesit { get; set; }
    }



}
