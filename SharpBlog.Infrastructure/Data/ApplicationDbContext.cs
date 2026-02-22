using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SharpBlog.Domain.Entities;
using SharpBlog.Infrastructure.Identity;

namespace SharpBlog.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<Comment> Comments => Set<Comment>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<BlogPost>(entity =>
        {
            entity.Property(post => post.Title)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(post => post.Content)
                .HasMaxLength(5000)
                .IsRequired();

            entity.HasMany(post => post.Comments)
                .WithOne(comment => comment.Post)
                .HasForeignKey(comment => comment.PostId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Comment>(entity =>
        {
            entity.Property(comment => comment.Content)
                .HasMaxLength(1000)
                .IsRequired();
        });
    }
}
