using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RetailPosApi.Infrastructure.ServiceInstaller
{
    public class CorsPolicy : IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            //allow cors
            services.AddCors(options =>
            {
                options.AddPolicy("Policy1",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                                        .WithExposedHeaders("x-pagination")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                    });

                options.AddPolicy("AnotherPolicy",
                    builder =>
                    {
                         builder.AllowAnyOrigin()
                                        .WithExposedHeaders("x-pagination")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                    });
            });
        }
    }
}
