using System.ComponentModel.DataAnnotations;

namespace MyApi.Models
{
    public class Category
    {
        [Key]
        public int id { get; set; }
        [Required]
        [MaxLength(50)]
        public string name { get; set; }
        public User? user { get; set; }
        public int? userId { get; set; }
        public DateTime createdAt { get; set; }= DateTime.Now;
        public DateTime updatedAt { get; set; }= DateTime.Now;
    }
}