using MyApi.Dto;
using MyApi.Models;

namespace MyApi.Mappers
{
    public static class TodoMapper
    {
        public static TodoDto ToDto(this Todo todo)
        {
            return new TodoDto
            {
                id = todo.id,
                title = todo.title,
                description = todo.description,
                priority = todo.priority,
                status = todo.status,
                createdAt = todo.createdAt,
                updatedAt = todo.updatedAt,
                userId = todo.userId,
                categoryId = todo.categoryId,
                tags = todo.tags.Select(t => (string?)t.name).ToList()
            };
        }
    }
}
