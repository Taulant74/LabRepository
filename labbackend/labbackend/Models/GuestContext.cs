
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

 namespace labbackend.Models
{
    public class GuestContext : DbContext
    {
        public GuestContext(DbContextOptions<GuestContext> options) : base(options)
        {
        }

        public DbSet<Guest> Guests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Guest>().ToTable("Guest"); // Map to the correct table name
        }
    }



}
