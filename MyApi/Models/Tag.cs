using System.ComponentModel.DataAnnotations;
namespace MyApi.Models
{
    public class Tag
    {
        [Key]
        public int id { get; set; }
        [Required]
        [StringLength(50)]
        public string name { get; set; }
        public List<Todo> todos { get; set; }
        public User? user { get; set; }
        public int? userId { get; set; }
        public DateTime createdAt { get; set; }= DateTime.UtcNow;
        public DateTime updatedAt { get; set; }= DateTime.UtcNow;
    }
}