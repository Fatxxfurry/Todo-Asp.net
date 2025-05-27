using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
using MyApi.Service;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;

    public AuthController(IJwtService jwtService, IUserService userService)
    {
        _userService = userService;
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDto request)
    {
        var user = _userService.LoginAsync(request.email, request.password);
        if (user != null)
        {
            var token = _jwtService.GenerateToken(user.Result.email, user.Result.id.Value, user.Result.role.ToString());
            return Ok(token);
        }
        return Unauthorized();
    }
}