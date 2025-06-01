using Microsoft.Extensions.Hosting;
using MyApi.Models.Enums;
using MyApi.Repositories;
namespace MyApi.HostedServices
{
    public class TodoStatusUpdater : BackgroundService
    {
        private readonly ITodoRepository _todoRepository;
        
        public TodoStatusUpdater(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }
        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
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