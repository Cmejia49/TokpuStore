using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using RetailPosApi.Model.V1.Helper;
using RetailPosApi.Model.V1.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RetailPosApi.Service.DamageReportService
{
    public class DamageReportRepository : IDamageRepository
    {
        private readonly ItemContext _context;
        public DamageReportRepository(ItemContext context)
        {
            _context = context;
        }
        public async Task<bool> Create(Damage entity)
        {
            if (entity == null)
            {
                throw new ArgumentException(null, nameof(entity));
            }

            entity.CreateDate = DateTime.Today;
            var stock = _context.Stocks.FirstOrDefault(i => i.StockId == entity.StockFid);
            stock.Quantity = DecreaseQuantity(entity.Quantity, stock.Quantity);


            _context.Damages.Add(entity);

            return (await _context.SaveChangesAsync() > 0);
        }

        public async Task<bool> Delete(Damage entity)
        {
            if (entity == null)
            {
                throw new ArgumentException(null, nameof(entity));
            }
            var stock = _context.Stocks.FirstOrDefault(i => i.StockId == entity.StockFid);
            stock.Quantity = IncreaseQuantity(entity.Quantity, stock.Quantity);
            _context.Damages.Remove(entity);

            return (await _context.SaveChangesAsync() >0);
        }

        public async Task<PagedList<Damage>> GetByDate(FilterParameter filterParameter)
        {
            var damage = FilterOption.CheckId(_context.Damages, filterParameter.id).Where(s => s.CreateDate.Date == filterParameter.DateTime)
           .OrderBy(x => x.CreateDate);

            return await PagedList<Damage>.ToPagedList(
                  damage, filterParameter.PageNumber,
                  filterParameter.PageSize,
                  filterParameter.Type);
        }

        public async Task<PagedList<Damage>> GetByDay(FilterParameter filterParameter)
        {
            var damage = FilterOption.Filter(FilterOption.CheckId(_context.Damages, filterParameter.id), filterParameter.Day.ToString()).OrderBy(x => x.CreateDate);

            return await PagedList<Damage>.ToPagedList(
                        damage, filterParameter.PageNumber,
                        filterParameter.PageSize,
                        filterParameter.Type);
        }

        public async Task<PagedList<Damage>> GetAll(FilterParameter filterParameter)
        {
            var damage = _context.Damages
                .Include(s => s.Store).Where(x => x.StockFid == filterParameter.id);


            return await PagedList<Damage>.ToPagedList(
                  damage, filterParameter.PageNumber,
                  filterParameter.PageSize,
                  filterParameter.Type);
        }

        public async Task<Damage> Get(int id)
        {
            return await _context.Damages
                .FirstOrDefaultAsync(i => i.DamageId == id);
        }

        private int DecreaseQuantity(int DamageStock = 0, int itemStock = 0)
        {
            return itemStock - DamageStock;
        }
        private int IncreaseQuantity(int DamageStock = 0, int itemStock = 0)
        {
            return DamageStock + itemStock;
        }


 
        public Task<bool> Update(Damage entity)
        {
            throw new NotImplementedException();
        }

    }
}
