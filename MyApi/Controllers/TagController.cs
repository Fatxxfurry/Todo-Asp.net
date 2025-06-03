using MyApi.Service;
using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
using Microsoft.AspNetCore.Authorization;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        private readonly IAuthorizationService _authorizationService;


        public TagController(ITagService tagService, IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
            _tagService = tagService;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAllTags()
        {
            return Ok(await _tagService.GetAllTagsAsync());
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<TagDto>> GetTagById(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            var result = await _authorizationService.AuthorizeAsync(User, tag, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _tagService.GetTagByIdAsync(id));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<TagDto>> CreateTag([FromBody] TagDto tagDto)
        {
            try
            {
                var result = await _authorizationService.AuthorizeAsync(User, tagDto, "EditPolicy");
                if (!result.Succeeded)
                {
                    return Forbid();
                }
                return Ok(await _tagService.CreateTagAsync(tagDto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<TagDto>> UpdateTag([FromBody] TagDto tagDto)
        {
            var result = await _authorizationService.AuthorizeAsync(User, tagDto, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok(await _tagService.UpdateTagAsync(tagDto));
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult> DeleteTag(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            var result = await _authorizationService.AuthorizeAsync(User, tag, "EditPolicy");
            if (!result.Succeeded)
            {
                return Forbid();
            }
            await _tagService.DeleteTagAsync(id);
            return NoContent();
        }
    }
}
