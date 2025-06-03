using MyApi.Service;
using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
using Microsoft.AspNetCore.Authorization;
using Mysqlx.Crud;
using System.Security.Claims;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IRedisCacheService _redisCacheService;

        public UserController(IUserService userService, IAuthorizationService authorizationService, IRedisCacheService redisCacheService)
        {
            _redisCacheService = redisCacheService;
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
        [HttpPut("{id}/avatar/")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<UserDto>> UpdateUserAvatar(int id, IFormFile file)
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
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
            return await _userService.UpdateUserAvatarAsync(id, file);
        }
        [HttpPut("{id}/email")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<UserDto>> UpdateUserEmail(int id, [FromBody] VerifyCodeRequestDto request)
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
            var storedCode = await _redisCacheService.GetAsync($"verify:{request.Email}");

            if (storedCode == null)
                return BadRequest("Mã xác minh không tồn tại hoặc đã hết hạn.");

            if (storedCode != request.Code)
                return BadRequest("Mã xác minh không đúng.");

            await _redisCacheService.DeleteAsync($"verify:{request.Email}");
            var updatedUser = await _userService.UpdateUserAsync(user);
            return Ok(updatedUser);
        }

    }
}
