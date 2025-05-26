using MyApi.Models;
using MyApi.Dto;
using MyApi.Repositories;
using AutoMapper;
using MyApi.Exceptions;
namespace MyApi.Service.Impl
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICategoryService _categoryService;
        private readonly ITodoService _todoService;
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, ICategoryService categoryService, ITodoService todoService, ITagService tagService, IMapper mapper)
        {
            try
            {
                _tagService = tagService ?? throw new ArgumentNullException(nameof(tagService));
                _todoService = todoService ?? throw new ArgumentNullException(nameof(todoService));
                _categoryService = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
                _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
                _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Initialization of UserService failed.", ex);
            }
        }

        public async Task<UserDto> RegisterAsync(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var createdUser = await _userRepository.CreateUserAsync(user);
            if (createdUser == null)
            {
                throw new InvalidOperationException("User registration failed.");
            }
            return _mapper.Map<UserDto>(createdUser);
        }

        public async Task<UserDto> GetByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            return _mapper.Map<UserDto>(user);
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(user => _mapper.Map<UserDto>(user)).ToList();
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> UpdateUserAsync(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var updatedUser = await _userRepository.UpdateUserAsync(user);
            return _mapper.Map<UserDto>(updatedUser);
        }

        public async Task<UserDto> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            await _userRepository.DeleteUserAsync(id);
            return _mapper.Map<UserDto>(user);
        }
        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesByUserIdAsync(int id)
        {
            var categories = await _categoryService.GetCategoriesByUserIdAsync(id);
            return categories.Select(category => _mapper.Map<CategoryDto>(category)).ToList();
        }
        public async Task<IEnumerable<TodoDto>> GetAllTodosByUserIdAsync(int id)
        {
            var todos = await _todoService.GetTodosByUserIdAsync(id);
            return todos.Select(todo => _mapper.Map<TodoDto>(todo)).ToList();
        }
        public async Task<IEnumerable<TagDto>> GetAllTagsByUserIdAsync(int id)
        {
            var tags = await _tagService.GetTagsByUserIdAsync(id);
            return tags.Select(tag => _mapper.Map<TagDto>(tag)).ToList();
        }
    }
}
