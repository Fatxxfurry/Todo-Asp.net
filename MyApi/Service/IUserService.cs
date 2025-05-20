using MyApi.Models;
namespace MyApi.Service
{
    public interface IUserService
    {
        Task<User> RegisterAsync(User user);
        Task<User> LoginAsync(string email, string password);
        Task<User> GetByEmailAsync(string email);
        Task<List<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsyncAsync(int id);
        Task<User> UpdateUserAsync(User user);
        Task<User> DeleteUserAsync(int id);
    }
}
