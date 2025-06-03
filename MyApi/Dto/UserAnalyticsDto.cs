using MyApi.Models.Enums;
namespace MyApi.Dto
{
    public class UserAnalyticsDto
    {
        public int? id { get; set; }
        public string? userName { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }
        public Role? role { get; set; } = Role.USER;
        public string? imgName { get; set; } = string.Empty;
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
        public int? amountTag { get; set; }
        public int? amountCategory { get; set; }
        public int? amountTodo { get; set; }
    }
}
