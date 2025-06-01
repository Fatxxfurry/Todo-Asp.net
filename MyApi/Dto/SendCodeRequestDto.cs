using System.ComponentModel.DataAnnotations;
namespace MyApi.Dto
{
    public class SendCodeRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
