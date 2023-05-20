using EnglishGuide.Models;
using Microsoft.EntityFrameworkCore;

namespace EnglishGuide.Data
{
    public class DataContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity => {
                entity.HasIndex(e => e.Login).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.IsAdmin).HasDefaultValue(false);
            });
            builder.Entity<Rating>(entity =>
            {
                entity.HasIndex(e => new { e.IdUser, e.IdTranslation }).IsUnique();
            });

            builder.Entity<Translation>(entity =>
            {
                entity.HasIndex(e => new { e.SectionId, e.Language, e.IdPost }).IsUnique();
            });

            builder.Entity<User>(entity =>
            {
                entity.HasData(new User
                {
                    Id = 1,
                    Login = "Redziok",
                    Email = "Redziok@wp.pl",
                    Password = BCrypt.Net.BCrypt.HashPassword("Redziok"),
                    IsAdmin = true,
                });
            });
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}
