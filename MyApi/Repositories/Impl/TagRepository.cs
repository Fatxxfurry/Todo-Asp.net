using MyApi.Models;
using Microsoft.EntityFrameworkCore;
namespace MyApi.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly AppDbContext _context;

        public TagRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Tag?> GetByIdAsync(int id)
        {
            return await _context.Tags
                .FirstOrDefaultAsync(t => t.id == id);
        }

        public async Task<List<Tag>> GetAllAsync()
        {
            return await _context.Tags.ToListAsync();
        }

        public async Task<Tag> CreateAsync(Tag tag)
        {
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();
            return tag;
        }

        public async Task<Tag> UpdateAsync(Tag tag)
        {
            _context.Tags.Update(tag);
            await _context.SaveChangesAsync();
            return tag;
        }

        public async Task DeleteAsync(int id)
        {
            var tag = await GetByIdAsync(id);
            if (tag is null)
                return;

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Tag>> GetByUserIdAsync(int userId)
        {
            return await _context.Tags.Where(t => t.userId == userId).ToListAsync();
        }
    }
}
