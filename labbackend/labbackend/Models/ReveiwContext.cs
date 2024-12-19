using Microsoft.EntityFrameworkCore;

namespace backendLab.Models
{
    public class ReviewContext : DbContext
    {
        public ReviewContext(DbContextOptions<ReviewContext> options) : base(options)
        {
        }

        public DbSet<Review> Reviews { get; set; }
    }

}