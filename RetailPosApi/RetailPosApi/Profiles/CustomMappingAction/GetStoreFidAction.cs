using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.DataAccess;
using RetailPosApi.Dtos.DamageReportDtos;
using RetailPosApi.Model;
using System.Linq;
using System.Security.Claims;

namespace RetailPosApi.Profiles.CustomMappingAction
{
    public class GetStoreFidAction : IMappingAction<CreateDamageReportDto, Damage>
    {
        private readonly ItemContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetStoreFidAction(ItemContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public void Process(CreateDamageReportDto source, Damage destination, ResolutionContext context)
        {
            var user = _context.Users.Include(i => i.Store).FirstOrDefault(i => i.Id == GetUserId());
            destination.StoreFid = user.Store.StoreId;

        }
        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
    }
}
