using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MyApi.Service;
using MyApi.Models;
using MyApi.util;
using MyApi.Dto;
public class UserOwnerOrAdminHandler : AuthorizationHandler<UserOwnerOrAdminRequirement, UserDto>
{
    private readonly IUserService _userService;
    public UserOwnerOrAdminHandler(IUserService userService)
    {
        _userService = userService;
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserOwnerOrAdminRequirement requirement, UserDto user)
    {
        var userId = int.Parse(context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
        if (userId == user.id)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}