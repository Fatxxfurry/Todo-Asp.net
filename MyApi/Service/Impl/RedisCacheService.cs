using StackExchange.Redis;

namespace MyApi.Service.Impl
{
    public class RedisCacheService : IRedisCacheService
    {
        private readonly IDatabase _database;
        public RedisCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task<string> GetAsync(string key)
        {
            return await _database.StringGetAsync(key);
        }

        public async Task SetAsync(string key, string value, TimeSpan? expiry = null)
        {
            await _database.StringSetAsync(key, value, expiry);
        }
        public async Task DeleteAsync(string key)
        {
            await _database.KeyDeleteAsync(key);
        }
        public async Task<bool> KeyExistsAsync(string key)
        {
            return await _database.KeyExistsAsync(key);
        }
    }
}