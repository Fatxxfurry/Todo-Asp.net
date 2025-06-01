using System.ComponentModel.DataAnnotations;
namespace MyApi.Dto
{
    public class VerifyCodeRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(6, MinimumLength = 6)]
        public string Code { get; set; }
    }
}
