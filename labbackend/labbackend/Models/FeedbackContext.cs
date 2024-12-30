using Microsoft.EntityFrameworkCore;
using System;

namespace labbackend.Models
{
    public class FeedbackContext : DbContext
    {
        public FeedbackContext(DbContextOptions<FeedbackContext> options) : base(options)
        {
        }

        public DbSet<Feedback> Feedbacks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Feedback>().ToTable("Feedback"); // Map to the correct table name
        }
    }
    }

