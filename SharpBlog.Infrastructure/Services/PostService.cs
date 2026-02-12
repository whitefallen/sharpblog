using Microsoft.EntityFrameworkCore;
using SharpBlog.Application.DTOs.Posts;
using SharpBlog.Application.Interfaces;
using SharpBlog.Domain.Entities;
using SharpBlog.Infrastructure.Data;

namespace SharpBlog.Infrastructure.Services;

public class PostService : IPostService
{
    private readonly ApplicationDbContext _dbContext;

    public PostService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<PostDto>> GetPostsAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.BlogPosts
            .AsNoTracking()
            .OrderByDescending(post => post.CreatedAt)
            .Select(post => new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                AuthorId = post.AuthorId
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<PostDto?> GetPostByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.BlogPosts
            .AsNoTracking()
            .Where(post => post.Id == id)
            .Select(post => new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                AuthorId = post.AuthorId
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<PostDto> CreatePostAsync(string authorId, CreatePostRequest request, CancellationToken cancellationToken)
    {
        var entity = new BlogPost
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Content = request.Content,
            AuthorId = authorId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.BlogPosts.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new PostDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Content = entity.Content,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt,
            AuthorId = entity.AuthorId
        };
    }

    public async Task<OperationStatus> UpdatePostAsync(Guid id, string authorId, UpdatePostRequest request, bool isAdmin, CancellationToken cancellationToken)
    {
        var entity = await _dbContext.BlogPosts.FirstOrDefaultAsync(post => post.Id == id, cancellationToken);
        if (entity is null)
        {
            return OperationStatus.NotFound;
        }

        if (!isAdmin && entity.AuthorId != authorId)
        {
            return OperationStatus.Forbidden;
        }

        entity.Title = request.Title;
        entity.Content = request.Content;
        entity.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return OperationStatus.Success;
    }

    public async Task<OperationStatus> DeletePostAsync(Guid id, string authorId, bool isAdmin, CancellationToken cancellationToken)
    {
        var entity = await _dbContext.BlogPosts.FirstOrDefaultAsync(post => post.Id == id, cancellationToken);
        if (entity is null)
        {
            return OperationStatus.NotFound;
        }

        if (!isAdmin && entity.AuthorId != authorId)
        {
            return OperationStatus.Forbidden;
        }

        _dbContext.BlogPosts.Remove(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return OperationStatus.Success;
    }
}
