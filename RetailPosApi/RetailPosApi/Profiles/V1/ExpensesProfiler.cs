using AutoMapper;
using RetailPosApi.Dtos.ExpensesDtos;
using RetailPosApi.Model;
using RetailPosApi.Profiles.CustomMappingAction;

namespace RetailPosApi.Profiles
{

    public class ExpensesProfiler : Profile
    {
        public ExpensesProfiler()
        {
            CreateMap<Expenses, ReadExpensesDto>()
                .ForMember(s => s.StoreName, opt => opt.MapFrom(x => x.store.StoreName))
                .ForMember(s => s.CreateDate, opt => opt.MapFrom(x => x.CreateDate.ToString("dd/MM/yyyy")));

            CreateMap<CreateExpensesDto, Expenses>()
                .BeforeMap<ExpensesGetStoreFidAction>();
        }
    }
}
