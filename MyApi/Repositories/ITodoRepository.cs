using MyApi.Models;
using MyApi.Dto;
namespace MyApi.Repositories
{
    public interface ITodoRepository
    {
        Task<List<Todo>> GetAllAsync();
        Task<Todo?> GetByIdAsync(int id);
        Task<Todo> CreateAsync(Todo todo);
        Task<Todo> UpdateAsync(Todo todo);
        Task DeleteAsync(int id);
        Task<List<Todo>> GetByUserIdAsync(int userId);
        Task<List<Todo>> GetByCategoryIdAsync(int categoryId);
        Task<List<Todo>> GetByTagsAsync(List<Tag> tags);
        Task<Todo> AddTagAsync(Todo todo, Tag tag);
        Task DeleteTagAsync(Todo todo, Tag tag);
        Task<List<Todo>> FilterAsync(TodosFilterDto filterDto);
        Task<List<Todo>> GetOverdueAsync();
        Task<List<Todo>> GetByDueDateAsync(DateTime dueDate);
    }
}
