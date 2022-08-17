using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace RetailPosApi.Infrastructure.ServiceInstaller
{
    public static class ServiceInstallerExtensions
    {
        public static void InstallCurrentAssemblyServices(this IServiceCollection services, IConfiguration configuration)
        {
            //Get all concrete implementations of the IInstaller interface in this very assembly, then
            //create instances of these classes, then
            //cast these instances to IInstaller interface, then
            //run InstallServices in every each one of these instances
            var installers = typeof(Startup).Assembly.ExportedTypes.Where(x =>
             typeof(IInstaller).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                 .Select(Activator.CreateInstance).Cast<IInstaller>().ToList();
            installers.ForEach(installer => installer.InstallService(services, configuration));
        }
    }
}
