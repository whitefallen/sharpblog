using System.ComponentModel.DataAnnotations;

namespace SharpBlog.Application.DTOs.Posts;

public class UpdatePostRequest
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(5000)]
    public string Content { get; set; } = string.Empty;
}
