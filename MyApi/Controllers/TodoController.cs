using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
using MyApi.Service;
using Microsoft.AspNetCore.Authorization;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;
        private readonly IAuthorizationService _authorizationService;

        public TodoController(ITodoService todoService, IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
            _todoService = todoService;
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetAllTodos()
        {
            return Ok(await _todoService.GetAllTodosAsync());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<TodoDto>> GetTodoById(int id)
        {
            var todo = await _todoService.GetTodoByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, todo, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(todo);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TodoDto>> CreateTodo([FromBody] TodoDto todoDto)
        {
            var result = await _authorizationService.AuthorizeAsync(User, todoDto, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _todoService.CreateTodoAsync(todoDto));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<TodoDto>> UpdateTodo([FromBody] TodoDto todoDto)
        {
            var result = await _authorizationService.AuthorizeAsync(User, todoDto, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _todoService.UpdateTodoAsync(todoDto));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteTodoById(int id)
        {
            var todo = await _todoService.GetTodoByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, todo, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            await _todoService.DeleteTodoByIdAsync(id);
            return NoContent();
        }
    }
}
