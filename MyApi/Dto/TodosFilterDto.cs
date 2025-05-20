using MyApi.Models.Enums;
namespace MyApi.Dto
{
    public class TodosFilterDto
    {
        public int? id { get; set; }
        public int? userId { get; set; }
        public int? categoryId { get; set; }
        public int? tagId { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
        public TodoStatus? todoStatus { get; set; }
        public Priority? priorityStatus { get; set; }
        public List<string> tags { get; set; } = new List<string>();
    }
}
