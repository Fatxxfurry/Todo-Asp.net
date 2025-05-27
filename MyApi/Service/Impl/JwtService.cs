using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
public class JwtService : IJwtService
{
    private readonly IConfiguration _config;

    public JwtService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateToken(string email, int userId, string role)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: new[] { new Claim(ClaimTypes.Name, email), new Claim(ClaimTypes.NameIdentifier, userId.ToString()), new Claim(ClaimTypes.Role, role) },
            expires: DateTime.Now.AddMinutes(double.Parse(_config["Jwt:ExpiresInMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}