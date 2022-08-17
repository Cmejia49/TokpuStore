using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using RetailPosApi.Model.V1;
using RetailPosApi.Model.V1.Helper;
using RetailPosApi.Model.V1.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RetailPosApi.Service.SaleService
{
    public class SaleRepository : ISaleRepository
    {
        private readonly ItemContext _context;
        public SaleRepository(ItemContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateSaleItem(List<Sale> sale)
        {
            if (sale == null)
            {
                throw new ArgumentException(nameof(sale));
            }
            foreach (var item in sale)
            {
                item.CreateDate = DateTime.Today;
                var stock = _context.Stocks.FirstOrDefault(i => i.StockId == item.StockFid);
                stock.Quantity = DecreaseQuantity(item.Quantity, stock.Quantity);
            }
            _context.Sales.AddRange(sale);
            return (await _context.SaveChangesAsync() > 0);
        }

        public async Task<PagedList<Sale>> GetAll(FilterParameter entity)
        {
            var sale = _context.Sales
                .Include(s => s.Store)
                .Where(s => s.Store.UserFid == entity.id)
                .OrderBy(x => x.CreateDate);

            return await PagedList<Sale>.ToPagedList(
                         sale, entity.PageNumber,
                         entity.PageSize,
                         entity.Type);

        }


        public async Task<PagedList<Sale>> GetByDay(FilterParameter filterParameter)
        {
            var sale = FilterOption.Filter(FilterOption.CheckId(_context.Sales,filterParameter.id), filterParameter.Day.ToString()).OrderBy(x => x.CreateDate);
            return await PagedList<Sale>.ToPagedList(
                         sale, filterParameter.PageNumber,
                         filterParameter.PageSize,
                         filterParameter.Type);
        }

        public async Task<PagedList<Sale>> GetByDate(FilterParameter filterParameter)
        {
            var sale = FilterOption.CheckId(_context.Sales, filterParameter.id).Where(s=> s.CreateDate.Date == filterParameter.DateTime)
                .OrderBy(x => x.CreateDate);


            return await PagedList<Sale>.ToPagedList(sale, filterParameter.PageNumber,
                filterParameter.PageSize,
                filterParameter.Type);
        }

        public async Task<Sale> Get(int id)
        {
            return await _context.Sales
                    .FirstOrDefaultAsync(i => i.SaleId == id);


        }
        public async Task<bool> DeleteSaleItem(Sale sale)
        {
            if (sale == null)
            {
                throw new ArgumentException(nameof(sale));
            }
            var stock = _context.Stocks.FirstOrDefault(i => i.StockId == sale.StockFid);
            stock.Quantity = IncreaseQuantity(sale.Quantity, stock.Quantity);
            _context.Sales.Remove(sale);
            return (await _context.SaveChangesAsync() > 0);
        }
        public bool SaveChanges()
        {
            return (_context.SaveChanges() > 0);
        }
        //Helper Method
        private int GetTotalItemCost(Sale sales)
        {
            return sales.Quantity * sales.Price;
        }
        private int DecreaseQuantity(int salesStock = 0, int itemStock = 0)
        {

            return itemStock - salesStock;
        }
        private int IncreaseQuantity(int salesStock = 0, int itemStock = 0)
        {
            return salesStock + itemStock;
        }
        private bool StockStatus(int saleStock = 0, int itemsStock = 0)
        {
            if (saleStock > itemsStock)
            {
                return false;
            }
            return true;
        }
        public Task<bool> Create(Sale entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Sale entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(Sale entity)
        {
            throw new NotImplementedException();
        }
    }
}
