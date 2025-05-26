using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
using MyApi.Service;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetAllTodos()
        {
            return Ok(await _todoService.GetAllTodosAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodoById(int id)
        {
            return Ok(await _todoService.GetTodoByIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<TodoDto>> CreateTodo([FromBody] TodoDto todoDto)
        {
            return Ok(await _todoService.CreateTodoAsync(todoDto));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoDto>> UpdateTodo([FromBody] TodoDto todoDto)
        {
            return Ok(await _todoService.UpdateTodoAsync(todoDto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodoById(int id)
        {
            await _todoService.DeleteTodoByIdAsync(id);
            return NoContent();
        }
    }
}
