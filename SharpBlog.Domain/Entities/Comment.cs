namespace SharpBlog.Domain.Entities;

public class Comment
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public Guid PostId { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public BlogPost? Post { get; set; }
}
