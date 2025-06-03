using MyApi.Models; 
namespace MyApi.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<List<Category>> GetCategoriesByUserIdAsync(int userId);
        Task<Category> CreateAsync(Category category);
        Task<Category> UpdateAsync(Category category);
        Task DeleteAsync(int id);
        Task<Category?> GetByNameAsync(string name);
    }
}
