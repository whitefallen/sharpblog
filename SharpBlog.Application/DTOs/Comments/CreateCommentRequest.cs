using System.ComponentModel.DataAnnotations;

namespace SharpBlog.Application.DTOs.Comments;

public class CreateCommentRequest
{
    [Required]
    [StringLength(1000)]
    public string Content { get; set; } = string.Empty;
}
