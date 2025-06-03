namespace MyApi.Dto
{
    public class TagDto: BaseData
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
