using MyApi.Models;
using Microsoft.EntityFrameworkCore;
using MyApi.Repositories;

namespace MyApi.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.id == id);
            if (user is null)
                return;

            var todos = await _context.Todos
                .Where(t => t.userId == id)
                .ToListAsync();
            _context.Todos.RemoveRange(todos);

            var tags = await _context.Tags
                .Where(t => t.userId == id)
                .ToListAsync();
            _context.Tags.RemoveRange(tags);

            var categories = await _context.Categories
                .Where(c => c.userId == id)
                .ToListAsync();
            _context.Categories.RemoveRange(categories);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.id == id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.email == email);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.userName == username);
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<int> GetTodoCountByUserIdAsync(int userId)
        {
            return await _context.Todos.CountAsync(t => t.userId == userId);
        }

        public async Task<int> GetCategoryCountByUserIdAsync(int userId)
        {
            return await _context.Categories.CountAsync(c => c.userId == userId);
        }

        public async Task<int> GetTagCountByUserIdAsync(int userId)
        {
            return await _context.Tags.CountAsync(t => t.userId == userId);
        }
    }
}
