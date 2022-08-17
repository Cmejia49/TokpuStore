using AutoMapper;
using RetailPosApi.Dtos.V1.ImagesDtos;
using RetailPosApi.Model.V1;
using RetailPosApi.Profiles.CustomValueResolver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Profiles.V1
{
    public class ImageProfile: Profile
    {
        public ImageProfile()
        {
            CreateMap<Images, ReadImagesDto>()
                      .ForMember(s => s.ImageSrc, opt => opt.MapFrom<ImageSrcValueResolver>());
        }
    }
}
