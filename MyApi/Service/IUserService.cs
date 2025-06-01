using MyApi.Models;
using MyApi.Dto;
namespace MyApi.Service
{
    public interface IUserService
    {
        Task<UserDto> RegisterAsync(UserDto user);
        Task<UserDto> LoginAsync(string email, string password);
        Task<UserDto> GetByEmailAsync(string email);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task<UserDto> UpdateUserAsync(UserDto userDto);
        Task<UserDto> DeleteUserAsync(int id);
        Task<IEnumerable<CategoryDto>> GetAllCategoriesByUserIdAsync(int id);
        Task<IEnumerable<TodoDto>> GetAllTodosByUserIdAsync(int id);
        Task<IEnumerable<TagDto>> GetAllTagsByUserIdAsync(int id);
        Task<UserDto> UpdateUserAvatarAsync(int id, IFormFile file);
        Task<UserDto> ForgotPasswordAsync(string email, string password);
    }
}
