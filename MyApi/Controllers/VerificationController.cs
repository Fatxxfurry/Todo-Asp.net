
using Microsoft.AspNetCore.Mvc;
using MyApi.Service;
using MyApi.Dto;
[ApiController]
[Route("api/[controller]")]
public class VerificationController : ControllerBase
{
    private readonly IRedisCacheService _redisCacheService;
    private readonly IEmailService _emailService;

    public VerificationController(IRedisCacheService redisCacheService, IEmailService emailService)
    {
        _emailService = emailService;
        _redisCacheService = redisCacheService;
    }

    [HttpPost("send-code")]
    public async Task<IActionResult> SendCode([FromBody] SendCodeRequestDto request)
    {
        string code = new Random().Next(100000, 999999).ToString();

        await _redisCacheService.SetAsync($"verify:{request.Email}", code, TimeSpan.FromMinutes(5));

        await _emailService.SendEmailAsync(request.Email, "Xác minh", $"Mã xác minh: {code}");

        return Ok(new { Message = "Mã xác minh đã được gửi." });
    }

    [HttpPost("verify-code")]
    public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeRequestDto request)
    {
        var storedCode = await _redisCacheService.GetAsync($"verify:{request.Email}");

        if (storedCode == null)
            return BadRequest("Mã xác minh không tồn tại hoặc đã hết hạn.");

        if (storedCode != request.Code)
            return BadRequest("Mã xác minh không đúng.");

        await _redisCacheService.DeleteAsync($"verify:{request.Email}");

        return Ok("Xác minh thành công!");
    }
}
