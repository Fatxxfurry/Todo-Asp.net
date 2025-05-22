using MyApi.Models;
using MyApi.Dto;
namespace MyApi.Service
{
    public interface IUserService
    {
        Task<UserDto> RegisterAsync(User user);
        Task<UserDto> GetByEmailAsync(string email);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task<UserDto> UpdateUserAsync(UserDto userDto);
        Task<UserDto> DeleteUserAsync(int id);
    }
}
