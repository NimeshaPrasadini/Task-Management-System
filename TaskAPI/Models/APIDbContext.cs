using Microsoft.EntityFrameworkCore;

namespace TaskAPI.Models
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; } 
    }
}
