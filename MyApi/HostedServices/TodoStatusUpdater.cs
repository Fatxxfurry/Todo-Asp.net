using Microsoft.Extensions.Hosting;
using MyApi.Models.Enums;
using MyApi.Repositories;
namespace MyApi.HostedServices
{
    public class TodoStatusUpdater : BackgroundService
    {

        private readonly IServiceProvider _serviceProvider;

        public TodoStatusUpdater(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
         
        }
        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var _todoRepository = scope.ServiceProvider.GetRequiredService<ITodoRepository>();
                    var now = DateTime.Now;
                    var next3AM = now.Date.AddDays(1).AddHours(3);
                    var delay = next3AM - now;
                    await Task.Delay(delay, cancellationToken);
                    var overDueTodos = await _todoRepository.GetOverdueAsync();
                    foreach (var todo in overDueTodos)
                    {
                        todo.status = TodoStatus.Overdue;
                        await _todoRepository.UpdateAsync(todo);
                    }
                    await Task.Delay(TimeSpan.FromDays(1), cancellationToken);
                }
            }
        }
    }
}