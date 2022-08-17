using AutoMapper;
using RetailPosApi.DataAccess;
using RetailPosApi.Dtos.StockDtos;
using RetailPosApi.Model;
using System.Linq;

namespace RetailPosApi.Profiles.CustomMappingAction
{
    public class GetSaleStoreFidAction : IMappingAction<StockCreateDto, Stock>
    {
        private readonly ItemContext _context;

        public GetSaleStoreFidAction(ItemContext context)
        {
            _context = context;
        }
        public void Process(StockCreateDto source, Stock destination, ResolutionContext context)
        {
            destination.ItemFid = _context.Item.Select(x => x.ItemId).LastOrDefault();
        }


    }
}
