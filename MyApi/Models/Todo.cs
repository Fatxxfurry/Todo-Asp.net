using MyApi.Models.Enums;
using System.ComponentModel.DataAnnotations;
namespace MyApi.Models
{
    public class Todo
    {
        [Key]
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public TodoStatus status { get; set; } = TodoStatus.NotStarted;
        public Priority priority { get; set; } = Priority.Low;
        public DateTime dueDate { get; set; }
        public User? user { get; set; }
        public int? userId { get; set; }
        public Category? category { get; set; }
        public int? categoryId { get; set; }
        public List<Tag> tags { get; set; }
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public DateTime updatedAt { get; set; } = DateTime.UtcNow;
    }
}