using MyApi.Models;
using MyApi.Dto;
namespace MyApi.Service
{
    public interface IUserService
    {
        Task<UserDto> RegisterAsync(User user);
        Task<UserDto> LoginAsync(string email, string password);
        Task<UserDto> GetByEmailAsync(string email);
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsyncAsync(int id);
        Task<UserDto> UpdateUserAsync(UserDto userDto);
        Task<UserDto> DeleteUserAsync(int id);
    }
}
