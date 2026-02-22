using SharpBlog.Application.DTOs.Auth;

namespace SharpBlog.Application.Interfaces;

public interface ITokenService
{
    Task<AuthResponse> CreateTokenAsync(string userId, string email, IEnumerable<string> roles);
}
