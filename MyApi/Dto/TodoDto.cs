using MyApi.Models.Enums;

namespace MyApi.Dto
{
    public class TodoDto
    {
        public int? id { get; set; }
        public string? title { get; set; }
        public string? description { get; set; }
        public Priority? priority { get; set; }
        public TodoStatus? status { get; set; }
        public int? categoryId { get; set; }
        public List<string?>? tagNames { get; set; } = new List<string?>();
        public int? userId { get; set; }
        public DateTime? dueDate { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
