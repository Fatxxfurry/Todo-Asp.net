using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
using MyApi.Service;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;

    private readonly IEmailService _emailService;

    private readonly IRedisCacheService _redisCacheService;

    public AuthController(IJwtService jwtService, IUserService userService, IEmailService emailService, IRedisCacheService redisCacheService)
    {
        _emailService = emailService;
        _redisCacheService = redisCacheService;
        _userService = userService;
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        var user = await _userService.LoginAsync(request.email, request.password);
        if (user != null)
        {
            var token = _jwtService.GenerateToken(user.email, user.id.Value, user.role.ToString());
            return Ok(token);
        }
        return Unauthorized();
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto request)
    {
        var user = await _userService.GetByEmailAsync(request.Email);

        if (user == null)
        {
            return BadRequest("Email not found.");
        }
        var storedCode = await _redisCacheService.GetAsync($"verify:{request.Email}");

        if (storedCode == null)
            return BadRequest("Mã xác minh không tồn tại hoặc đã hết hạn.");

        if (storedCode != request.Code)
            return BadRequest("Mã xác minh không đúng.");

        await _redisCacheService.DeleteAsync($"verify:{request.Email}");

        await _userService.ForgotPasswordAsync(request.Email, request.NewPassword);
        var token = _jwtService.GenerateToken(user.email, user.id.Value, user.role.ToString());
        
        return Ok(token);
    }
}
