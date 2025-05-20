
using System.ComponentModel.DataAnnotations;
using MyApi.Models.Enums;

namespace MyApi.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string userName { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string password { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string email { get; set; }
        public Role role { get; set; } = Role.USER;
        public string imgName { get; set; } = string.Empty;
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public DateTime updatedAt { get; set; } = DateTime.UtcNow;
        public List<Todo> todos { get; set; } = new List<Todo>();
        public List<Category> categories { get; set; } = new List<Category>();
        public List<Tag> tags { get; set; } = new List<Tag>();
    }
}