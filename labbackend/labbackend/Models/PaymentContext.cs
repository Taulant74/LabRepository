using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class PaymentContext : DbContext
    {
        public PaymentContext(DbContextOptions<PaymentContext> options) : base(options)
        {
        }

        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Just points to dbo.Payment. 
            modelBuilder.Entity<Payment>().ToTable("Payment");
        }
    }
}
