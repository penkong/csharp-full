using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace myine.Persistance {
    public class DataContext : DbContext {

        public DataContext (DbContextOptions<DataContext> options) : base (options) {

        }

        // value is domain , Values are table name
        public DbSet<Value> Values { get; set; }
    }

}