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
        try
        {
            var user = await _userService.LoginAsync(request.email, request.password);
            if (user != null)
            {
                var token = _jwtService.GenerateToken(user.email, user.id.Value, user.role.ToString());
                var response = new
                {
                    token = token,
                    user = user
                };
                return Ok(response);
            }
            else return BadRequest("Invalid email or password.");
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }


    [HttpPost("sign-up")]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequestDto request)
    {
        try
        {
            var storedCode = await _redisCacheService.GetAsync($"verify:{request.Email}");

            if (storedCode == null || storedCode != request.Code)
                return BadRequest(new
                {
                    message = "Mã xác minh không tồn tại hoặc đã hết hạn."
                });
            await _redisCacheService.DeleteAsync($"verify:{request.Email}");
            if (storedCode != request.Code)
                return BadRequest(new
                {
                    message = "Mã xác minh không đúng."
                });
            var userDto = new UserDto
            {
                email = request.Email,
                password = request.Password,
                userName = request.Name
            };
            var user = await _userService.RegisterAsync(userDto);
            if (user != null)
            {
                var token = _jwtService.GenerateToken(user.email, user.id.Value, user.role.ToString());
                var response = new
                {
                    token = token,
                    user = user
                };
                return Ok(response);
            }
            else return BadRequest("Invalid request.");
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
    
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto request)
    {
        try
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

            user = await _userService.ForgotPasswordAsync(request.Email, request.NewPassword);
            var token = _jwtService.GenerateToken(user.email, user.id.Value, user.role.ToString());
            var response = new
            {
                token = token,
                user = user
            };
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}
