using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SharpBlog.Application.DTOs.Posts;
using SharpBlog.Application.Interfaces;

namespace SharpBlog.Web.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;

    public PostsController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PostDto>>> GetPosts(CancellationToken cancellationToken)
    {
        var posts = await _postService.GetPostsAsync(cancellationToken);
        return Ok(posts);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PostDto>> GetPost(Guid id, CancellationToken cancellationToken)
    {
        var post = await _postService.GetPostByIdAsync(id, cancellationToken);
        if (post is null)
        {
            return NotFound();
        }

        return Ok(post);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<PostDto>> CreatePost(CreatePostRequest request, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var post = await _postService.CreatePostAsync(userId, request, cancellationToken);
        return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdatePost(Guid id, UpdatePostRequest request, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var result = await _postService.UpdatePostAsync(id, userId, request, User.IsInRole("Admin"), cancellationToken);
        return result switch
        {
            OperationStatus.NotFound => NotFound(),
            OperationStatus.Forbidden => Forbid(),
            _ => NoContent()
        };
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeletePost(Guid id, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var result = await _postService.DeletePostAsync(id, userId, User.IsInRole("Admin"), cancellationToken);
        return result switch
        {
            OperationStatus.NotFound => NotFound(),
            OperationStatus.Forbidden => Forbid(),
            _ => NoContent()
        };
    }
}
