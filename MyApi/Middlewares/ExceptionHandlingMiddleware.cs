using Microsoft.AspNetCore.Mvc;
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context); // gọi middleware tiếp theo
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception occurred");

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            var problem = new ProblemDetails
            {
                Status = 500,
                Title = "Internal Server Error",
                Type = "https://httpstatuses.com/500",
                Detail = _env.IsDevelopment() ? ex.ToString() : "An unexpected error occurred."
            };

            await context.Response.WriteAsJsonAsync(problem);
        }
    }
}
