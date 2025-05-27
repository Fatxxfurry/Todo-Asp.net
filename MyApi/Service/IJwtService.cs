public interface IJwtService
{
    string GenerateToken(string email, int userId, string role);
}