using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json.Serialization;

namespace RetailPosApi.Infrastructure.ServiceInstaller
{
    public class ServiceController : IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers()
                  .AddJsonOptions(options => {
        //              options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                      options.JsonSerializerOptions.PropertyNamingPolicy = null;
                  })
                  .AddNewtonsoftJson(options =>
                      options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

          //  services.AddSwaggerGenNewtonsoftSupport();
        }
    }
}
