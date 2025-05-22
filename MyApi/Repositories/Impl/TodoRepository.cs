using MyApi.Models;
using Microsoft.EntityFrameworkCore;
using MyApi.Repositories;
public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Todo>> GetAllAsync()
    {
        return await _context.Todos.ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(int id)
    {
        return await _context.Todos
            .FirstOrDefaultAsync(t => t.id == id);
    }

    public async Task<Todo> CreateAsync(Todo todo)
    {
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        return todo;
    }

    public async Task<Todo> UpdateAsync(Todo todo)
    {
        _context.Todos.Update(todo);
        await _context.SaveChangesAsync();
        return todo;
    }

    public async Task DeleteAsync(int id)
    {
        var todo = await GetByIdAsync(id);
        if (todo is null)
            return;

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
    }
}
