using SharpBlog.Application.DTOs.Comments;

namespace SharpBlog.Application.Interfaces;

public interface ICommentService
{
    Task<IReadOnlyList<CommentDto>> GetCommentsAsync(Guid postId, CancellationToken cancellationToken);
    Task<CommentDto?> AddCommentAsync(Guid postId, string authorId, CreateCommentRequest request, CancellationToken cancellationToken);
    Task<OperationStatus> DeleteCommentAsync(Guid postId, Guid commentId, string authorId, bool isAdmin, CancellationToken cancellationToken);
}
