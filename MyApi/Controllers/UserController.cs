using MyApi.Service;
using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
using Microsoft.AspNetCore.Authorization;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        public UserController(IUserService userService, IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
            _userService = userService;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, user, "UserPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(user);
        }

        [HttpGet("{id}/categories")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategoriesByUserId(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, user, "UserPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _userService.GetAllCategoriesByUserIdAsync(id));
        }

        [HttpGet("{id}/todos")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetAllTodosByUserId(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, user, "UserPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _userService.GetAllTodosByUserIdAsync(id));
        }

        [HttpGet("{id}/tags")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAllTagsByUserId(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, user, "UserPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _userService.GetAllTagsByUserIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserDto userDto)
        {
            return await _userService.RegisterAsync(userDto);
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<UserDto>> UpdateUser([FromBody] UserDto userDto)
        {
            var user = await _userService.GetUserByIdAsync(userDto.id.Value);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, user, "UserPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return await _userService.UpdateUserAsync(userDto);
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, user, "UserPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
