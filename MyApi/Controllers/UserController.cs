using MyApi.Service;
using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            return await _userService.GetUserByIdAsync(id);
        }

        [HttpGet("{id}/categories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategoriesByUserId(int id)
        {
            return Ok(await _userService.GetAllCategoriesByUserIdAsync(id));
        }

        [HttpGet("{id}/todos")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetAllTodosByUserId(int id)
        {
            return Ok(await _userService.GetAllTodosByUserIdAsync(id));
        }

        [HttpGet("{id}/tags")]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAllTagsByUserId(int id)
        {
            return Ok(await _userService.GetAllTagsByUserIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserDto userDto)
        {
            return await _userService.RegisterAsync(userDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> UpdateUser([FromBody] UserDto userDto)
        {
            return await _userService.UpdateUserAsync(userDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
