using MyApi.Models;
using MyApi.Dto;
using MyApi.Repositories;
using AutoMapper;
using MyApi.Exceptions;
using Microsoft.AspNetCore.Identity;
namespace MyApi.Service.Impl
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICategoryService _categoryService;
        private readonly ITodoService _todoService;
        private readonly ITagService _tagService;

        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IMapper _mapper;

        private readonly PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();

        public UserService(IUserRepository userRepository, ICategoryService categoryService, ITodoService todoService, ITagService tagService, IMapper mapper, IWebHostEnvironment env)
        {
            try
            {
                _tagService = tagService ?? throw new ArgumentNullException(nameof(tagService));
                _todoService = todoService ?? throw new ArgumentNullException(nameof(todoService));
                _categoryService = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
                _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
                _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
                _webHostEnvironment = env ?? throw new ArgumentNullException(nameof(env));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Initialization of UserService failed.", ex);
            }
        }

        public async Task<UserDto> RegisterAsync(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            user.createdAt = DateTime.Now;
            user.updatedAt = DateTime.Now;
            user.password = _passwordHasher.HashPassword(user, user.password);
            var createdUser = await _userRepository.CreateUserAsync(user);
            if (createdUser == null)
            {
                throw new InvalidOperationException("User registration failed.");
            }
            return _mapper.Map<UserDto>(createdUser);
        }
        public async Task<UserDto> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            switch (_passwordHasher.VerifyHashedPassword(user, user.password, password))
            {
                case PasswordVerificationResult.Success:
                    return _mapper.Map<UserDto>(user);
                case PasswordVerificationResult.Failed:
                    throw new UnauthorizedAccessException("Invalid password.");
            }
            return _mapper.Map<UserDto>(user);
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
            user.password = _passwordHasher.HashPassword(user, user.password);
            user.updatedAt = DateTime.Now;
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
        public async Task<UserDto> UpdateUserAvatarAsync(int id, IFormFile file)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            user.imgName = file.Name;
            user.updatedAt = DateTime.Now;
            var projectRoot = Path.GetFullPath(Path.Combine(_webHostEnvironment.ContentRootPath, ".."));
            var frontendPublic = Path.Combine(projectRoot, "frontend", "public", "avatars");
            var filePath = Path.Combine(frontendPublic, file.Name);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var updatedUser = await _userRepository.UpdateUserAsync(user);
            return _mapper.Map<UserDto>(updatedUser);
        }
        public async Task<UserDto> ForgotPasswordAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            user.password = _passwordHasher.HashPassword(user, password);
            user.updatedAt = DateTime.Now;
            var updatedUser = await _userRepository.UpdateUserAsync(user);
            return _mapper.Map<UserDto>(updatedUser);
        }
    }
}
