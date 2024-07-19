using Microsoft.EntityFrameworkCore;

namespace SistemaSCP_API.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Produto> Produtos { get; set; } = null!;
    }
}
