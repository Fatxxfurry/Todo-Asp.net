using MyApi.Dto;
using MyApi.Models;
namespace MyApi.Mappers
{
    public static class TagMapper
    {
        public static TagDto ToDto(this Tag tag)
        {
            return new TagDto
            {
                id = tag.id,
                name = tag.name,
                createdAt = tag.createdAt,
                updatedAt = tag.updatedAt
            };
        }
    }
}
