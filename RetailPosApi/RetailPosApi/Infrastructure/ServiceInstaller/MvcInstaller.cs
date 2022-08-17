using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RetailPosApi.Contracts;
using RetailPosApi.Service;
using RetailPosApi.Service.AuthService;
using RetailPosApi.Service.ExpensesService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Infrastructure.ServiceInstaller
{
    public class MvcInstaller : IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {


            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

            services.AddScoped<IAuthRepository, AuthRepository>();

            services.AddControllers()
                   .AddJsonOptions(options =>
                        options.JsonSerializerOptions.PropertyNamingPolicy = null)
                   .AddNewtonsoftJson(options =>
                       options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        }
    }
}
