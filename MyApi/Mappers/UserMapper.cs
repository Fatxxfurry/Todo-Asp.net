using MyApi.Dto;
using MyApi.Models;

namespace api.Mappers;

public static class UserMapper
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            id = user.id,
            userName = user.userName,
            email = user.email,
            password = user.password,
            role = user.role,
            createdAt = user.createdAt,
            updatedAt = user.updatedAt
        };
    }
}