using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using RetailPosApi.Model.V1.Helper;
using RetailPosApi.Model.V1.Parameter;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RetailPosApi.Service.ExpensesService
{

    public class ExpensesRepository : IExpensesRepository
    {
        private readonly ItemContext _context;
        public ExpensesRepository(ItemContext context)
        {
            _context = context;

        }


        public async Task<bool> Create(Expenses entity)
        {
            if (entity == null)
            {

                throw new ArgumentException(null, nameof(entity));
            }
            entity.CreateDate = DateTime.Today;
            _context.Expenses.Add(entity);
            return (await _context.SaveChangesAsync() > 0);
        }


        public async Task<bool> Delete(Expenses entity)
        {
            if (entity == null)
            {
                throw new ArgumentException(null, nameof(entity));
            }
            _context.Expenses.Remove(entity);
            return (await _context.SaveChangesAsync() > 0);
        }

        public Task<Expenses> Get(int id)
        {
            throw new NotImplementedException();
        }


        public async Task<PagedList<Expenses>> GetAll(FilterParameter entity)
        {
            var expenses = _context.Expenses
                .Include(s => s.store)
                .Where(s => s.StoreFid == entity.id)
                .OrderBy(x => x.CreateDate);

            return await PagedList<Expenses>.ToPagedList(
                    expenses, entity.PageNumber,
                    entity.PageSize,
                    entity.Type);
        }

        public async Task<PagedList<Expenses>> GetByDate(FilterParameter filterParameter)
        {
            var expenses = FilterOption.CheckId(_context.Expenses, filterParameter.id)
                .Include(x => x.store)
                .Where(s => s.CreateDate.Date == filterParameter.DateTime)
                 .OrderBy(x => x.CreateDate);

            return await PagedList<Expenses>.ToPagedList(
            expenses, filterParameter.PageNumber,
            filterParameter.PageSize,
            filterParameter.Type);
        }

        public async Task<PagedList<Expenses>> GetByDay(FilterParameter filterParameter)
        {
            var expenses = FilterOption.Filter(FilterOption.CheckId(_context.Expenses, filterParameter.id), filterParameter.Day.ToString())
                .Include(x => x.store)
                .OrderBy(x => x.CreateDate);

            return await PagedList<Expenses>.ToPagedList(
                     expenses, filterParameter.PageNumber,
                     filterParameter.PageSize,
                      filterParameter.Type);
        }
        public Task<bool> Update(Expenses entity)
        {
            throw new NotImplementedException();
        }
    }
}
