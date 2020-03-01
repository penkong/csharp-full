using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }
        public DbSet<Value> Values { get; set; }
    }
}