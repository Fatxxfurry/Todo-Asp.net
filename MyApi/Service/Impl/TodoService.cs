// using MyApi.Dto;
// using MyApi.Models;
// using MyApi.Models.Enums;
// namespace MyApi.Service
// {
//     public interface ITodoService
//     {
//         Task<TodoDto> CreateTodoAsync(TodoDto todoDto);
//         Task<TodoDto> GetTodoByIdAsync(int id);
//         Task<List<TodoDto>> GetAllTodosAsync();
//         Task<TodoDto> UpdateTodoAsync(TodoDto todoDto);
//         Task DeleteTodoByIdAsync(int id);
//         Task<List<TodoDto>> GetTodosByUserIdAsync(int userId);
//         Task<List<TodoDto>> GetTodosByCategoryIdAsync(int categoryId);
//         Task<List<TodoDto>> GetTodosByTagIdAsync(int tagId);
//         Task<List<TodoDto>> FilterTodosAsync(TodosFilterDto filterDto);
//     }
// }
using MyApi.Dto;
using MyApi.Models;
using MyApi.Repositories;
using AutoMapper;
using MyApi.Exceptions;
namespace MyApi.Service.Impl
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _repository;

        private readonly IMapper _mapper;

        public TodoService(ITodoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<TodoDto> CreateTodoAsync(TodoDto todoDto)
        {
            var todo = _mapper.Map<Todo>(todoDto);
            await _repository.CreateAsync(todo);
            return _mapper.Map<TodoDto>(todo);
        }

        public async Task<TodoDto> GetTodoByIdAsync(int id)
        {
            var todo = await _repository.GetByIdAsync(id);
            if (todo == null)
            {
                throw new NotFoundException("Todo not found.");
            }
            return _mapper.Map<TodoDto>(todo);
        }

        public async Task<List<TodoDto>> GetAllTodosAsync()
        {
            var todos = await _repository.GetAllAsync();
            return todos.Select(todo => _mapper.Map<TodoDto>(todo)).ToList();
        }

        public async Task<TodoDto> UpdateTodoAsync(TodoDto todoDto)
        {
            var todo = await _repository.GetByIdAsync(todoDto.id.Value);
            if (todo == null)
            {
                throw new NotFoundException("Todo not found.");
            }
            if (todoDto.title != null)
            {
                todo.title = todoDto.title;
            }
            if (todoDto.description != null)
            {
                todo.description = todoDto.description;
            }
            if (todoDto.priority != null)
            {
                todo.priority = todoDto.priority.Value;
            }
            if (todoDto.status != null)
            {
                todo.status = todoDto.status.Value;
            }
            todo.updatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(todo);

            return _mapper.Map<TodoDto>(todo);
        }

        public async Task DeleteTodoByIdAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<List<TodoDto>> GetTodosByUserIdAsync(int userId)
        {
            var todos = await _repository.GetByUserIdAsync(userId);
            return todos.Select(todo => _mapper.Map<TodoDto>(todo)).ToList();
        }

        public async Task<List<TodoDto>> GetTodosByCategoryIdAsync(int categoryId)
        {
            var todos = await _repository.GetByCategoryIdAsync(categoryId);
            return todos.Select(todo => _mapper.Map<TodoDto>(todo)).ToList();
        }

        // public async Task<List<TodoDto>> GetTodosByTagIdAsync(int tagId)
        // {
        //     var todos = await _repository.GetByTagIdAsync(tagId);
        //     return todos.Select(todo => _mapper.Map<TodoDto>(todo)).ToList();
        // }

        public async Task<List<TodoDto>> FilterTodosAsync(TodosFilterDto filterDto)
        {
            var todos = await _repository.FilterAsync(filterDto);
            return todos.Select(todo => _mapper.Map<TodoDto>(todo)).ToList();
        }
    }
}
