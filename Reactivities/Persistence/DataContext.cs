
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    // we use from this class as service and means
    // we can use it in different part of other project.
    // === because we specify app user we dont need use dbset in our class.
    public class DataContext : IdentityDbContext<AppUser> {

        // u create migration with cli remember.
        // 
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }
        // this name going to be name of table in dbs.
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activites { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     if (!optionsBuilder.IsConfigured)
        //     {
        //         optionsBuilder.UseSqlite("ConnectionString");
        //     }
        // }

        // this is for seeding
        protected override void OnModelCreating (ModelBuilder builder) 
        {
            // to give our appUser a pk of a string
            base.OnModelCreating(builder);

            builder  
                .Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "value 101"},
                    new Value { Id = 2, Name = "value 102"},
                    new Value { Id = 3, Name = "value 103"}
                );
        }
    }
}