using MyApi.Dto;
using MyApi.Models;
using MyApi.Models.Enums;
namespace MyApi.Service
{
    public interface ITodoService
    {
        Task<Todo> CreateTodoAsync(Todo todo);
        Task<Todo> GetTodoByIdAsync(int id);
        Task<List<Todo>> GetAllTodosAsync();
        Task<Todo> UpdateTodoAsync(Todo todo);
        Task DeleteTodoByIdAsync(int id);
        Task<List<Todo>> GetTodosByUserIdAsync(int userId);
        Task<List<Todo>> GetTodosByCategoryIdAsync(int categoryId);
        Task<List<Todo>> GetTodosByTagIdAsync(int tagId);
        Task<List<Todo>> FilterTodosAsync(TodosFilterDto filterDto);
    }
}
