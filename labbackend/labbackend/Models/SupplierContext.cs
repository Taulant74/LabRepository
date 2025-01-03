﻿
using Microsoft.EntityFrameworkCore;

namespace labbackend.Models
{
    public class SupplierContext : DbContext
    {
        public SupplierContext(DbContextOptions<SupplierContext> options) : base(options)
        {
        }

        public DbSet<Supplier> Suppliers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Supplier>().ToTable("Supplier"); // Map to the correct table name
        }
    }
}