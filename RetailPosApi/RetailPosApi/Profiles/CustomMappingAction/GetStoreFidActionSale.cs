using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.DataAccess;
using RetailPosApi.Dtos.SaleDto;
using RetailPosApi.Model;
using System.Linq;
using System.Security.Claims;

namespace RetailPosApi.Profiles.CustomMappingAction
{
    public class GetStoreFidSale : IMappingAction<SaleCreateDto, Sale>
    {
        private readonly ItemContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetStoreFidSale(ItemContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public void Process(SaleCreateDto source, Sale destination, ResolutionContext context)
        {
            var user = _context.Users.Include(i => i.Store).FirstOrDefault(i => i.Id == GetUserId());
            destination.StoreFid = user.Store.StoreId;

        }
        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
    }
}
