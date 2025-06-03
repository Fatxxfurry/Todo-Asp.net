using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MyApi.Dto;
using MyApi.util;
public class OwnerOrAdminHandler<T> : AuthorizationHandler<OwnerOrAdminRequirement, T> where T : BaseData
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        OwnerOrAdminRequirement requirement, T entity)
    {
        var userId = int.Parse(context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
        var isAdmin = context.User.IsInRole("ADMIN");
        Console.WriteLine(isAdmin);
        if (userId == entity.userId || isAdmin)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
