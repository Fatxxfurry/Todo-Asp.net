namespace MyApi.Dto
{
    public class CategoryDto
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public int? userId { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}

