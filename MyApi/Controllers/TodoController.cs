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
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;
        private readonly IAuthorizationService _authorizationService;

        public TodoController(ITodoService todoService, IAuthorizationService authorizationService, IUserService userService, ICategoryService categoryService)
        {
            _categoryService = categoryService;
            _userService = userService;
            _authorizationService = authorizationService;
            _todoService = todoService;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetAllTodos()
        {
            return Ok(await _todoService.GetAllTodosAsync());
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
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
        [Authorize(AuthenticationSchemes = "Bearer")]
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
        [Authorize(AuthenticationSchemes = "Bearer")]
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
        [Authorize(AuthenticationSchemes = "Bearer")]
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
        [HttpGet("user/{userId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodosByUserId(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, user, "UserPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _todoService.GetTodosByUserIdAsync(userId)
            );
        }
        [HttpGet("category/{categoryId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodosByCategoryId(int categoryId)
        {
            var category = await _categoryService.GetCategoryByIdAsync(categoryId);
            if (category == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, category, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(
await _todoService.GetTodosByCategoryIdAsync(categoryId)
            );
        }
    }
}
