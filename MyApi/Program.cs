using Microsoft.EntityFrameworkCore;
using MyApi.Models;
using MyApi.Repositories;
using MyApi.Repositories.Implementations;
using MyApi.Service;
using MyApi.Service.Impl;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MyApi.Mappers;
using MyApi.util;
using Microsoft.AspNetCore.Authorization;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        var config = builder.Configuration.GetSection("Jwt");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = config["Issuer"],
            ValidAudience = config["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Key"]))
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("EditPolicy", policy => policy.Requirements.Add(new OwnerOrAdminRequirement()));
    options.AddPolicy("UserPolicy", policy => policy.Requirements.Add(new UserOwnerOrAdminRequirement()));
});
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITodoService, TodoService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthorizationHandler, OwnerOrAdminHandler<BaseData>>();
builder.Services.AddScoped<IAuthorizationHandler, UserOwnerOrAdminHandler>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseMiddleware<ExceptionMiddleware>();
app.UseRouting();
app.UseAuthorization();
app.UseAuthentication();
app.UseHttpsRedirection();

app.MapControllers();
app.Run();

