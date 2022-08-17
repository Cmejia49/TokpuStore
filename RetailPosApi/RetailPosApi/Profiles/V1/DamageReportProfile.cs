using AutoMapper;
using RetailPosApi.Dtos.DamageReportDtos;
using RetailPosApi.Model;
using RetailPosApi.Profiles.CustomMappingAction;

namespace RetailPosApi.Profiles
{
    public class DamageReportProfile : Profile
    {
        public DamageReportProfile()
        {
            CreateMap<Damage, ReadDamageReportDto>()
                .ForMember(x=> x.CreateDate, opt=>opt.MapFrom(y=>y.CreateDate.ToString("dd/MM/yyyy")));

            CreateMap<CreateDamageReportDto, Damage>()
                       .BeforeMap<GetStoreFidAction>();
        }

    }
}
