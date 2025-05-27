using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MyApi.util;
using MyApi.Models;
public class OwnerOrAdminHandler<T> : AuthorizationHandler<OwnerOrAdminRequirement, T> where T : BaseData
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        OwnerOrAdminRequirement requirement, T entity)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var isAdmin = context.User.IsInRole("ADMIN");

        if (isAdmin || entity.userId.ToString() == userId)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
public abstract class BaseData
{
    public int userId { get; set; }
}
