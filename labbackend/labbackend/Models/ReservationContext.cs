using labbackend.Models;
using Microsoft.EntityFrameworkCore;

namespace backendLab.Models
{
    public class ReservationContext : DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options) : base(options)
        {
        }

        public DbSet<Reservation> Reservations { get; set; }
    }

}