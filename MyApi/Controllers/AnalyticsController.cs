using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyApi.Service;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly ITagService _tagService;
    private readonly ICategoryService _categoryService;
    private readonly ITodoService _todoService;
    private readonly IUserService _userService;

    public AnalyticsController(ITagService tagService, ICategoryService categoryService, ITodoService todoService, IUserService userService)
    {
        _tagService = tagService;
        _categoryService = categoryService;
        _todoService = todoService;
        _userService = userService;
    }
    [HttpGet]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
    public async Task<IActionResult> get()
    {
        var tags = await _tagService.GetAllTagsAsync();
        var categories = await _categoryService.GetAllCategoriesAsync();
        var todos = await _todoService.GetAllTodosAsync();
        var users = await _userService.GetAllUserAnalyticsAsync();
        var result = new
        {
            tags = tags.Count,
            categories = categories.Count,
            todos = todos.Count,
            users = users
        };
        return Ok(result);
    }
}