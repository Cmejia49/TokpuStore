using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RetailPosApi.Service.StoreService
{
    public class StoreRepository : IStoreRepository
    {
        private readonly ItemContext _context;

        public StoreRepository(ItemContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Store entity)
        {
            if (entity == null)
            {
                throw new ArgumentException(null, nameof(entity));
            }
            _context.Stores.Add(entity);
            return (await _context.SaveChangesAsync() > 0);
        }


        public async Task<bool> Delete(Store entity)
        {
            if (entity == null)
            {
                throw new ArgumentException(null, nameof(entity));
            }
            _context.Stores.Remove(entity);
   
            return (await _context.SaveChangesAsync() > 0);
        }

        public Task<Store> Get(int id)
        {
            return _context.Stores
                .Include(s => s.User)
                .FirstOrDefaultAsync(x => x.StoreId == id);
        }


        public async Task<IReadOnlyCollection<Store>> GetAllStore()
        {
            return await _context.Stores.ToListAsync();
        }

        public async Task<bool> Update(Store entity)
        {
            return (await _context.SaveChangesAsync() > 0);
        }

        //Not implemented 
        public Task<PagedList<Store>> GetAll(QueryStringParameters entity)
        {
            throw new NotImplementedException();
        }


    }
}
