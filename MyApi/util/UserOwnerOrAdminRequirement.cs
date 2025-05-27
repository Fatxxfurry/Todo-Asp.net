using Microsoft.AspNetCore.Authorization;
namespace MyApi.util
{
    public class UserOwnerOrAdminRequirement : IAuthorizationRequirement { }
}
