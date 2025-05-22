using MyApi.Models;
namespace MyApi.Repositories
{
    public interface ITagRepository
    {
        Task<Tag?> GetByIdAsync(int id);
        Task<List<Tag>> GetAllAsync();
        Task<Tag> CreateAsync(Tag tag);
        Task<Tag> UpdateAsync(Tag tag);
        Task DeleteAsync(int id);
    }
}