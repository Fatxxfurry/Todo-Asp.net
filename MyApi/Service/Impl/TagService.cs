using MyApi.Dto;
using MyApi.Models;
using MyApi.Repositories;
using AutoMapper;
using MyApi.Exceptions;

namespace MyApi.Service.Impl
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _repository;
        private readonly IMapper _mapper;

        public TagService(ITagRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<TagDto> CreateTagAsync(TagDto tagDto)
        {
            var tag = _mapper.Map<Tag>(tagDto);
            var createdTag = await _repository.CreateAsync(tag);
            return _mapper.Map<TagDto>(createdTag);
        }

        public async Task<TagDto> GetTagByIdAsync(int id)
        {
            var tag = await _repository.GetByIdAsync(id);
            if (tag == null)
            {
                throw new NotFoundException("Tag not found.");
            }
            return _mapper.Map<TagDto>(tag);
        }

        public async Task<List<TagDto>> GetAllTagsAsync()
        {
            var tags = await _repository.GetAllAsync();
            return tags.Select(tag => _mapper.Map<TagDto>(tag)).ToList();
        }

        public async Task<TagDto> UpdateTagAsync(TagDto tagDto)
        {
            var tag = await _repository.GetByIdAsync(tagDto.id.Value);
            if (tag == null)
            {
                throw new NotFoundException("Tag not found.");
            }
            tag.name = tagDto.name;
            var updatedTag = await _repository.UpdateAsync(tag);
            return _mapper.Map<TagDto>(updatedTag);
        }

        public async Task DeleteTagAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<List<TagDto>> GetTagsByUserIdAsync(int userId)
        {
            var tags = await _repository.GetByUserIdAsync(userId);
            return tags.Select(tag => _mapper.Map<TagDto>(tag)).ToList();
        }
    }
}

