using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.DataAccess;
using RetailPosApi.Dtos.ExpensesDtos;
using RetailPosApi.Model;
using System;
using System.Linq;
using System.Security.Claims;

namespace RetailPosApi.Profiles.CustomMappingAction
{
    public class ExpensesGetStoreFidAction : IMappingAction<CreateExpensesDto, Expenses>
    {
        private readonly ItemContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ExpensesGetStoreFidAction(ItemContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public void Process(CreateExpensesDto source, Expenses destination, ResolutionContext context)
        {
            var user = _context.Users.Include(i => i.Store).FirstOrDefault(i => i.Id == GetUserId());
            destination.StoreFid = user.Store.StoreId;
        }

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
    }
}
