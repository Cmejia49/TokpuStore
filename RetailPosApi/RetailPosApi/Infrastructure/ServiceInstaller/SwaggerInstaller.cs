using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using RetailPosApi.Infrastructure.SwaggerVersioning;
using System;
using System.IO;
using System.Reflection;

namespace RetailPosApi.Infrastructure.ServiceInstaller
{
    public class SwaggerInstaller : IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {

            services.AddSwaggerGen(c =>
            {

                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "TokpuStoreApi",
                    Description = "TokpuStore Api for small business with custom fucntions to help for inventory and sale monitoring",
                    License = new OpenApiLicense
                    {
                        Name = "MIT Licenses",
                        Url = new Uri("https://opensource.org/licenses/MIT")
                    },
                    Version = "v1"
                });

/*
                c.SwaggerDoc("v2", new OpenApiInfo
                {
                    Title = "RetailPosApi",
                    Description = "RetailPosApi for small business with custom fucntions",
                    Contact = new OpenApiContact
                    {
                        Name = "Christopher Mejia",
                        Email = "MejiaChristopher49@gmail.com",
                        Url = new Uri("https://twitter.com/likelang49")
                    },
                    License = new OpenApiLicense
                    {
                        Name = "MIT Licenses",
                        Url = new Uri("https://opensource.org/licenses/MIT")
                    },
                    Version = "v2"
                });*/
               c.OperationFilter<RemoveVersionParameterFilter>();
                c.DocumentFilter<ReplaceVersionWithExactValueInPathFilter>();
                c.EnableAnnotations();


                //Generate the xml docs that'll drive the swagger docs
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter 'Bearer' [space] and then your valid token in the text input below.\r\n\r\nExample: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\"",
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}

                    }
                });

            });
            services.AddSwaggerGenNewtonsoftSupport();
        }
    }
}
