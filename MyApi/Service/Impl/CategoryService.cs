using MyApi.Dto;
using MyApi.Repositories;
using AutoMapper;
using MyApi.Models;
using MyApi.Exceptions;
namespace MyApi.Service.Impl
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return categories.Select(category => _mapper.Map<CategoryDto>(category)).ToList();
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                throw new NotFoundException("Category not found.");
            }
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto)
        {
            var existingCategory = await _categoryRepository.GetByNameAsync(categoryDto.name);
            if (existingCategory != null)
            {
                throw new Exception("Category already exists.");
            }
            var category = _mapper.Map<Category>(categoryDto);
            category.createdAt = DateTime.UtcNow;
            category.updatedAt = DateTime.UtcNow;
            var createdCategory = await _categoryRepository.CreateAsync(category);
            return _mapper.Map<CategoryDto>(createdCategory);
        }

        public async Task<CategoryDto> UpdateCategoryAsync(CategoryDto categoryDto)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryDto.id.Value);
            if (category == null)
            {
                throw new NotFoundException("Category not found.");
            }
            category.name = categoryDto.name;
            category.updatedAt = DateTime.UtcNow;
            var updatedCategory = await _categoryRepository.UpdateAsync(category);
            return _mapper.Map<CategoryDto>(updatedCategory);
        }

        public async Task DeleteCategoryAsync(int id)
        {
            await _categoryRepository.DeleteAsync(id);
        }

        public async Task<List<CategoryDto>> GetCategoriesByUserIdAsync(int userId)
        {
            var categories = await _categoryRepository.GetAllAsync();
            return categories.Where(c => c.userId == userId)
                             .Select(category => _mapper.Map<CategoryDto>(category)).ToList();
        }
    }
}
