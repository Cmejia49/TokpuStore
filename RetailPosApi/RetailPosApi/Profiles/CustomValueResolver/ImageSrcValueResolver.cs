using AutoMapper;
using Microsoft.AspNetCore.Http;
using RetailPosApi.Dtos.ItemDtos;
using RetailPosApi.Dtos.V1.ImagesDtos;
using RetailPosApi.Model.V1;
using System;
namespace RetailPosApi.Profiles.CustomValueResolver
{
    public class ImageSrcValueResolver : IValueResolver<Images, ReadImagesDto, string>
    {
        private readonly IHttpContextAccessor _httpContext;

        public ImageSrcValueResolver(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor;
        }
  
        public string Resolve(Images source, ReadImagesDto destination, string destMember, ResolutionContext context)
        {
            return context.Mapper.Map<string>(String.Format("{0}://{1}{2}/wwwroot/uploads/{3}",
                        _httpContext.HttpContext.Request.Scheme,
                        _httpContext.HttpContext.Request.Host,
                        _httpContext.HttpContext.Request.PathBase,
                        source.ImageName));
        }
    }
}
