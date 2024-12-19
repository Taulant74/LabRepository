
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
 namespace labbackend.Models;

public class GuestContext : DbContext
{
    public GuestContext(DbContextOptions<GuestContext> options) : base(options)
    {
    }

    public DbSet<Guest> Guests { get; set; }
}

