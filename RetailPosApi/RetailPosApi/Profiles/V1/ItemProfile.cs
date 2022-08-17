using AutoMapper;
using RetailPosApi.Dtos.ItemDtos;
using RetailPosApi.Dtos.StockDtos;
using RetailPosApi.Dtos.V1.OptionDtos;
using RetailPosApi.Dtos.V1.VariantDtos;
using RetailPosApi.Model;
using RetailPosApi.Model.V1;
using RetailPosApi.Profiles.CustomValueResolver;

namespace RetailPosApi.Profiles
{
    public class ItemProfile : Profile
    {
        public ItemProfile()
        {
            CreateMap<Items, ItemReadDto>()
                .ForMember(s => s.ImageList, opt => opt.MapFrom(x => x.ImageList));
          
            CreateMap<Items, SingleItemReadDto>()      
                 .ForMember(p => p.Categories, opt => opt.MapFrom(x => x.Category))
                 .ForMember(s => s.StockList, opt => opt.MapFrom(x => x.StockList))
                  .ForMember(v => v.VariantList, opt => opt.MapFrom(x => x.VariantList));

            CreateMap<ItemCreateDto, Items>()
                       .ForMember(v => v.StockList, opt => opt.MapFrom(x => x.StockList))
                       .ForMember(v => v.VariantList, opt => opt.MapFrom(x => x.VariantList));

            CreateMap<ItemUpdateDto, Items>()
                      .ForMember(s => s.StockList, opt => opt.MapFrom(x => x.StockList));

            CreateMap<Items, ItemUpdateDto>()
                      .ForMember(s => s.StockList, opt => opt.MapFrom(x => x.StockList));


            CreateMap<Stock, StockReadDto>();
            CreateMap<StockCreateDto, Stock>();
            CreateMap<StockUpdateDto, Stock>();
            CreateMap<Stock, StockUpdateDto>();

            CreateMap<Variants, ReadVariantDto>();
            CreateMap<CreateVariantDto, Variants>();
            CreateMap<UpdateVariantDto, Variants>();
            CreateMap<Variants, UpdateVariantDto>();

            CreateMap<Options, ReadOptionDto>();
            CreateMap<CreateOptionDto, Options>();
            CreateMap<UpdateOptionDto, Options>();
            CreateMap<Options, UpdateOptionDto>();


        }


    }
}
