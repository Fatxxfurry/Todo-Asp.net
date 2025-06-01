using MyApi.Dto;
using MyApi.Repositories;
using MyApi.Service;
namespace MyApi.HostedServices
{
    public class TodoTodayEmailNotifier : BackgroundService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;

        public TodoTodayEmailNotifier(ITodoRepository todoRepository, IEmailService emailService, IUserRepository userRepository)
        {
            _todoRepository = todoRepository;
            _emailService = emailService;
            _userRepository = userRepository;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var now = DateTime.Now;
                var next3AM = now.Date.AddDays(1).AddHours(3);
                var delay = next3AM - now;
                await Task.Delay(delay, stoppingToken);
                var users = await _userRepository.GetAllAsync();
                foreach (var user in users)
                {
                    if (user.email is not null)
                    {
                        var todoFilter = new TodosFilterDto();
                        todoFilter.userId = user.id;
                        todoFilter.dueDate = DateTime.Now.Date;
                        var todos = await _todoRepository.FilterAsync(todoFilter);
                        var count = todos.Count;
                        if (count > 0)
                        {
                            var recipient = user.email;
                            var subject = "Thông báo số lượng công việc sẽ quá hạn hôm nay";
                            var body = $"Chào {user.userName},\n\nBạn có {count} công việc cần làm trong ngày hôm nay.\n\nChúc bạn một ngày làm việc hiệu quả!";
                            await _emailService.SendEmailAsync(recipient, subject, body);
                        }

                    }
                }
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}