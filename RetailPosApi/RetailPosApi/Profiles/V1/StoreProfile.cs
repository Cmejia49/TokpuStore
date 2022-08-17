using AutoMapper;
using RetailPosApi.Dtos.StoreDto;
using RetailPosApi.Model;

namespace RetailPosApi.Profiles
{
    public class StoreProfile : Profile
    {
        public StoreProfile()
        {
            CreateMap<Store, StoreReadDto>();

            CreateMap<StoreCreateDto, Store>();
            CreateMap<StoreUpdateDto, Store>();
            CreateMap<Store, StoreUpdateDto>();
        }

    }
}
