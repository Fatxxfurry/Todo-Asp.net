using Microsoft.EntityFrameworkCore;
using MyApi.Models;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().ToTable("users").HasIndex(u => u.email).IsUnique();
        modelBuilder.Entity<Todo>().ToTable("todos");
        modelBuilder.Entity<Tag>().ToTable("tags").HasIndex(t => t.name).IsUnique();
        modelBuilder.Entity<Category>().ToTable("categories").HasIndex(c => c.name).IsUnique();
    }
}