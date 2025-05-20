using MyApi.Dto;
using MyApi.Models;
using MyApi.Models.Enums;
namespace MyApi.Service
{
    public interface ITodoService
    {
        Task<TodoDto> CreateTodoAsync(TodoDto todoDto);
        Task<TodoDto> GetTodoByIdAsync(int id);
        Task<List<TodoDto>> GetAllTodosAsync();
        Task<TodoDto> UpdateTodoAsync(TodoDto todoDto);
        Task DeleteTodoByIdAsync(int id);
        Task<List<TodoDto>> GetTodosByUserIdAsync(int userId);
        Task<List<TodoDto>> GetTodosByCategoryIdAsync(int categoryId);
        Task<List<TodoDto>> GetTodosByTagIdAsync(int tagId);
        Task<List<TodoDto>> FilterTodosAsync(TodosFilterDto filterDto);
    }
}
