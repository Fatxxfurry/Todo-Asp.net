using MyApi.Models.Enums;
namespace MyApi.Dto
{
    public class TodosFilterDto
    {
        public int? userId { get; set; }
        public int? categoryId { get; set; }
        public string? title { get; set; }
        public string? description { get; set; }
        public TodoStatus? todoStatus { get; set; }
        public Priority? priorityStatus { get; set; }
        public DateTime? dueDate { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
        public List<string> tagNames { get; set; } = new List<string>();
    }
}
