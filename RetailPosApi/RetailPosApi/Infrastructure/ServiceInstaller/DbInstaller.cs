using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetailPosApi.DataAccess;
using System;

namespace RetailPosApi.Infrastructure.ServiceInstaller
{
    public class DbInstaller : IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ItemContext>(options =>
            {
                var server = configuration["ServerName"];
                var port = "1433";
                var database = configuration["Database"];
                var user = configuration["UserName"];
                var password = configuration["Password"];

               //options.UseSqlServer(configuration.GetConnectionString("DefualtConnection"));
                 options.UseSqlServer(
                   $"Data Source={server},{port};Initial Catalog={database};User ID={user};Password={password};Trusted_Conne    Integrated Security=False");
          
            });
        }
    }
}
