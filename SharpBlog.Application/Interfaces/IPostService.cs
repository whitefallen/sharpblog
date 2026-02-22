using SharpBlog.Application.DTOs.Posts;

namespace SharpBlog.Application.Interfaces;

public interface IPostService
{
    Task<IReadOnlyList<PostDto>> GetPostsAsync(CancellationToken cancellationToken);
    Task<PostDto?> GetPostByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<PostDto> CreatePostAsync(string authorId, CreatePostRequest request, CancellationToken cancellationToken);
    Task<OperationStatus> UpdatePostAsync(Guid id, string authorId, UpdatePostRequest request, bool isAdmin, CancellationToken cancellationToken);
    Task<OperationStatus> DeletePostAsync(Guid id, string authorId, bool isAdmin, CancellationToken cancellationToken);
}
