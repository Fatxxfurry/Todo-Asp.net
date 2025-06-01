using System.ComponentModel.DataAnnotations;
namespace MyApi.Dto
{
    public class ForgotPasswordRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(6, MinimumLength = 6)]
        public string Code { get; set; }

        [Required]
        [StringLength(6, MinimumLength = 6)]
        public string NewPassword { get; set; }
    }
}
