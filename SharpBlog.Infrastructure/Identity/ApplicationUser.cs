using Microsoft.AspNetCore.Identity;

namespace SharpBlog.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public string DisplayName { get; set; } = string.Empty;
}
