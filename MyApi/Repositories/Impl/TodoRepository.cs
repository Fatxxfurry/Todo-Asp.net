using MyApi.Models;
using MyApi.Models.Enums;
using Microsoft.EntityFrameworkCore;
using MyApi.Repositories;
using MyApi.Dto;
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
        if (todo.dueDate > DateTime.Now)
        {
            todo.status = TodoStatus.Overdue;
        }
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        return todo;
    }

    public async Task<Todo> UpdateAsync(Todo todo)
    {
        if (todo.dueDate > DateTime.Now)
        {
            todo.status = TodoStatus.Overdue;
        }
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

    public async Task<List<Todo>> GetByUserIdAsync(int userId)
    {
        return await _context.Todos.Where(t => t.userId == userId).ToListAsync();
    }

    public async Task<List<Todo>> GetByCategoryIdAsync(int categoryId)
    {
        return await _context.Todos.Where(t => t.categoryId == categoryId).ToListAsync();
    }

    public async Task<Todo> AddTagAsync(Todo todo, Tag tag)
    {
        if (todo.tags.Any(t => t.id == tag.id))
            return todo;

        todo.tags.Add(tag);
        await _context.SaveChangesAsync();
        return todo;
    }
    public async Task<List<Todo>> GetByTagsAsync(List<Tag> tags)
    {
        return await _context.Todos
            .Where(t => tags.All(tag => t.tags.Any(tt => tt.id == tag.id)))
            .ToListAsync();
    }
    public async Task DeleteTagAsync(Todo todo, Tag tag)
    {
        if (!todo.tags.Any(t => t.id == tag.id))
            return;

        todo.tags.Remove(tag);
        await _context.SaveChangesAsync();
    }
    public async Task<List<Todo>> FilterAsync(TodosFilterDto filterDto)
    {
        var todos = await _context.Todos.ToListAsync();
        var filteredTodos = todos;
        if (filterDto.categoryId.HasValue)
            filteredTodos = filteredTodos.Where(t => t.categoryId == filterDto.categoryId).ToList();
        if (filterDto.tagNames != null && filterDto.tagNames.Count > 0)
        {
            foreach (var tagName in filterDto.tagNames)
            {
                filteredTodos = filteredTodos.Where(t => t.tags.Any(tt => tt.name == tagName)).ToList();
            }
        }
        if (filterDto.userId.HasValue)
            filteredTodos = filteredTodos.Where(t => t.userId == filterDto.userId).ToList();
        if (filterDto.title != null)
            filteredTodos = filteredTodos.Where(t => t.title.Contains(filterDto.title)).ToList();
        if (filterDto.description != null)
            filteredTodos = filteredTodos.Where(t => t.description.Contains(filterDto.description)).ToList();
        if (filterDto.todoStatus.HasValue)
            filteredTodos = filteredTodos.Where(t => t.status == filterDto.todoStatus).ToList();
        if (filterDto.priorityStatus.HasValue)
            filteredTodos = filteredTodos.Where(t => t.priority == filterDto.priorityStatus).ToList();
        if (filterDto.dueDate.HasValue)
            filteredTodos = filteredTodos.Where(t => t.dueDate.Date == filterDto.dueDate.Value.Date).ToList();
        if (filterDto.createdAt.HasValue)
            filteredTodos = filteredTodos.Where(t => t.createdAt == filterDto.createdAt).ToList();
        if (filterDto.updatedAt.HasValue)
            filteredTodos = filteredTodos.Where(t => t.updatedAt == filterDto.updatedAt).ToList();
        return filteredTodos;
    }
    public async Task<List<Todo>> GetOverdueAsync()
    {
        return await _context.Todos.Where(t => t.status == TodoStatus.Overdue).ToListAsync();
    }

    public async Task<List<Todo>> GetByDueDateAsync(DateTime date)
    {
        return await _context.Todos.Where(t => t.dueDate.Date == date.Date).ToListAsync();
    }
}
