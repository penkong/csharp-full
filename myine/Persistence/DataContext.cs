using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    // we use from this class as service and means
    // we can use it in different part of other project.
    public class DataContext : DbContext {

        // this name going to be name of table in dbs.
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activites { get; set; }
        // u create migration with cli remember.
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }

        // this is for seeding
        protected override void OnModelCreating (ModelBuilder modelBuilder) 
        {
            modelBuilder  
                .Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "value 101"},
                    new Value { Id = 2, Name = "value 102"},
                    new Value { Id = 3, Name = "value 103"}
                );
        }
    }
}