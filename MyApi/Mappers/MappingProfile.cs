using AutoMapper;
using MyApi.Dto;
using MyApi.Models;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>();
        CreateMap<Todo, TodoDto>(); 
        CreateMap<TodoDto, Todo>();
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryDto, Category>();
        CreateMap<Tag, TagDto>();
        CreateMap<TagDto, Tag>(); 
    }
}