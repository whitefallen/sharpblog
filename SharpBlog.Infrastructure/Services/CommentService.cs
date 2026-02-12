using Microsoft.EntityFrameworkCore;
using SharpBlog.Application.DTOs.Comments;
using SharpBlog.Application.Interfaces;
using SharpBlog.Domain.Entities;
using SharpBlog.Infrastructure.Data;

namespace SharpBlog.Infrastructure.Services;

public class CommentService : ICommentService
{
    private readonly ApplicationDbContext _dbContext;

    public CommentService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<CommentDto>> GetCommentsAsync(Guid postId, CancellationToken cancellationToken)
    {
        return await _dbContext.Comments
            .AsNoTracking()
            .Where(comment => comment.PostId == postId)
            .OrderBy(comment => comment.CreatedAt)
            .Select(comment => new CommentDto
            {
                Id = comment.Id,
                PostId = comment.PostId,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                AuthorId = comment.AuthorId
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<CommentDto?> AddCommentAsync(Guid postId, string authorId, CreateCommentRequest request, CancellationToken cancellationToken)
    {
        var postExists = await _dbContext.BlogPosts.AnyAsync(post => post.Id == postId, cancellationToken);
        if (!postExists)
        {
            return null;
        }

        var entity = new Comment
        {
            Id = Guid.NewGuid(),
            PostId = postId,
            AuthorId = authorId,
            Content = request.Content,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Comments.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new CommentDto
        {
            Id = entity.Id,
            PostId = entity.PostId,
            Content = entity.Content,
            CreatedAt = entity.CreatedAt,
            AuthorId = entity.AuthorId
        };
    }

    public async Task<OperationStatus> DeleteCommentAsync(Guid postId, Guid commentId, string authorId, bool isAdmin, CancellationToken cancellationToken)
    {
        var entity = await _dbContext.Comments
            .FirstOrDefaultAsync(comment => comment.PostId == postId && comment.Id == commentId, cancellationToken);

        if (entity is null)
        {
            return OperationStatus.NotFound;
        }

        if (!isAdmin && entity.AuthorId != authorId)
        {
            return OperationStatus.Forbidden;
        }

        _dbContext.Comments.Remove(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return OperationStatus.Success;
    }
}
