using Microsoft.AspNetCore.Mvc;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public TestController(IEmailService emailService)
        {  
            _emailService = emailService;
        }
        [HttpGet("email")]
        public async Task<IActionResult> SendEmail()
        {
            string recipient = "22520528@gm.uit.edu.vn";
            string subject = "Hello";
            string body = "Hello world!";

            await _emailService.SendEmailAsync(recipient, subject, body);

            return Ok();
        }
    }
}