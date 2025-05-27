using MyApi.Dto;
using MyApi.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IAuthorizationService _authorizationService;

        public CategoryController(ICategoryService categoryService, IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
            _categoryService = categoryService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
        {
            return Ok(await _categoryService.GetAllCategoriesAsync());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<CategoryDto>> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, category, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(category);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CategoryDto categoryDto)
        {
            var result = await _authorizationService.AuthorizeAsync(User, categoryDto, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _categoryService.CreateCategoryAsync(categoryDto));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<CategoryDto>> UpdateCategory([FromBody] CategoryDto categoryDto)
        {
            var result = await _authorizationService.AuthorizeAsync(User, categoryDto, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _categoryService.UpdateCategoryAsync(categoryDto));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, category, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            await _categoryService.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
