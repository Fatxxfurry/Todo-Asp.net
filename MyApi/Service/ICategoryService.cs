using MyApi.Dto;
namespace MyApi.Service
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync(int userId);
        Task<CategoryDto> GetCategoryByIdAsync(int id);
        Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto);
        Task<CategoryDto> UpdateCategoryAsync(CategoryDto categoryDto);
        Task DeleteCategoryAsync(int id);
        Task<List<CategoryDto>> GetCategoriesByUserIdAsync(int userId);
    }
}
