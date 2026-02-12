using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SharpBlog.Application.DTOs.Comments;
using SharpBlog.Application.Interfaces;

namespace SharpBlog.Web.Controllers;

[ApiController]
[Route("api/posts/{postId:guid}/comments")]
public class CommentsController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentsController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CommentDto>>> GetComments(Guid postId, CancellationToken cancellationToken)
    {
        var comments = await _commentService.GetCommentsAsync(postId, cancellationToken);
        return Ok(comments);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CommentDto>> AddComment(Guid postId, CreateCommentRequest request, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var comment = await _commentService.AddCommentAsync(postId, userId, request, cancellationToken);
        if (comment is null)
        {
            return NotFound();
        }

        return CreatedAtAction(nameof(GetComments), new { postId }, comment);
    }

    [Authorize]
    [HttpDelete("{commentId:guid}")]
    public async Task<IActionResult> DeleteComment(Guid postId, Guid commentId, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var result = await _commentService.DeleteCommentAsync(postId, commentId, userId, User.IsInRole("Admin"), cancellationToken);
        return result switch
        {
            OperationStatus.NotFound => NotFound(),
            OperationStatus.Forbidden => Forbid(),
            _ => NoContent()
        };
    }
}
