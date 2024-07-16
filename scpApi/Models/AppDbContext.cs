using Microsoft.EntityFrameworkCore;
using scpApi.Models;

namespace scpApi.Data{
    public class AppDbContext : DbContext 
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base (options) { }

        public DbSet<Produto> Produtos { get; set; }
    }
}