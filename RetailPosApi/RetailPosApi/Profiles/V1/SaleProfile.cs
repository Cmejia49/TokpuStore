using AutoMapper;
using RetailPosApi.Dtos.SaleDto;
using RetailPosApi.Dtos.V1.SaleDtos;
using RetailPosApi.Model;
using RetailPosApi.Profiles.CustomMappingAction;

namespace RetailPosApi.Profiles
{
    public class SaleProfile : Profile
    {
        public SaleProfile()
        {
            CreateMap<Sale, ReadSaleDto>()
                    .ForMember(s => s.StoreName, opt => opt.MapFrom(x => x.Store.StoreName))
                    .ForMember(s => s.ItemCode, opt => opt.MapFrom(x => x.ItemCode))
                    .ForMember(s => s.ProductName, opt => opt.MapFrom(x => x.ProductName))
                    .ForMember(s => s.Quantity, opt => opt.MapFrom(x => x.Quantity))
                    .ForMember(s => s.Price, opt => opt.MapFrom(x => x.Price))
                    .ForMember(s=>s.CreateDate,opt=>opt.MapFrom(x => x.CreateDate.ToString("dd/MM/yyyy")));

            CreateMap<SaleCreateDto, Sale>()
                  .BeforeMap<GetStoreFidSale>();

 

        }
    }
}
