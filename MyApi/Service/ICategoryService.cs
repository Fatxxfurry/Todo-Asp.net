using MyApi.Models;
namespace MyApi.Service
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoriesAsync(int userId);
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> CreateCategoryAsync(Category category);
        Task<Category> UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(int id);
        Task<List<Category>> GetCategoriesByUserIdAsync(int userId);
    }
}
