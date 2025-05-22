using MyApi.Models;
using MyApi.Dto;
namespace MyApi.Service
{
    public interface ITagService
    {
        Task<TagDto> CreateTagAsync(TagDto tagDto);
        Task<TagDto> GetTagByIdAsync(int id);
        Task<List<TagDto>> GetAllTagsAsync();
        Task<TagDto> UpdateTagAsync(TagDto tagDto);
        Task DeleteTagAsync(int id);
        Task<List<TagDto>> GetTagsByUserIdAsync(int userId);
    }
}
