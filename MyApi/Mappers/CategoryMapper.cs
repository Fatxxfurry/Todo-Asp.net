using MyApi.Dto;
using MyApi.Models;
namespace MyApi.Mappers
{
    public static class CategoryMapper
    {
        public static CategoryDto ToDto(this Category category)
        {
            return new CategoryDto
            {
                id = category.id,
                name = category.name,
                createdAt = category.createdAt,
                updatedAt = category.updatedAt
            };
        }
    }
}