using MyApi.Models;
namespace MyApi.Service
{
    public interface ITagService
    {
        Task<Tag> CreateTagAsync(Tag tag);
        Task<Tag> GetTagByIdAsync(int id);
        Task<List<Tag>> GetAllTagsAsync();
        Task<Tag> UpdateTagAsync(Tag tag);
        Task DeleteTagAsync(int id);
    }
}
