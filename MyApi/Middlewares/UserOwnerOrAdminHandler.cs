using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MyApi.Service;
using MyApi.Models;
using MyApi.util;
public class UserOwnerOrAdminHandler : AuthorizationHandler<UserOwnerOrAdminRequirement, User>
{
    private readonly IUserService _userService;
    public UserOwnerOrAdminHandler(IUserService userService)
    {
        _userService = userService;
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserOwnerOrAdminRequirement requirement, User user)
    {
        var userId = int.Parse(context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
        if (userId == user.id || context.User.IsInRole("ADMIN"))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}