using MyApi.Service;
using Microsoft.AspNetCore.Mvc;
using MyApi.Dto;
namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAllTags()
        {
            return Ok(await _tagService.GetAllTagsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TagDto>> GetTagById(int id)
        {
            return Ok(await _tagService.GetTagByIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<TagDto>> CreateTag([FromBody] TagDto tagDto)
        {
            return Ok(await _tagService.CreateTagAsync(tagDto));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TagDto>> UpdateTag([FromBody] TagDto tagDto)
        {
            return Ok(await _tagService.UpdateTagAsync(tagDto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTag(int id)
        {
            await _tagService.DeleteTagAsync(id);
            return NoContent();
        }
    }
}
