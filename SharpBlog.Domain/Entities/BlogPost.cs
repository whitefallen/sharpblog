namespace SharpBlog.Domain.Entities;

public class BlogPost
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
