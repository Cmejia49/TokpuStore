using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Service
{
    public class CategoriesRepository : ICategoryRepository
    {
        private readonly ItemContext _context;

        public CategoriesRepository(ItemContext itemContext)
        {
            _context = itemContext;
        }


        public async Task<bool> Create(Category entity)
        {
            if (entity == null)
            {
                throw new ArgumentException(nameof(entity));
            }

            var isExisting = await IsCategoryNameExist(entity.CategoryName);
            if (isExisting)
            {
                return false;
            }

            _context.Category.Add(entity);
            return (await _context.SaveChangesAsync() > 0);
        }

        public async Task<bool> Delete(Category categories)
        {

            _context.Category.Remove(categories);
            return (await _context.SaveChangesAsync() > 0);
        }


        public Task<PagedList<Category>> GetAll(ItemParameter entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            var categories =await _context.Category.ToListAsync();
            return categories;
        }

        public async Task<Category> Get(int id)
        {
            return await _context.Category.FirstOrDefaultAsync(x => x.CatId == id);
        }

        public async Task<bool> IsCategoryNameExist(string categoryName)
        {
            if(categoryName == null)
            {
                return false;
            }
            return await _context.Category.AsNoTracking().AnyAsync(x => x.CategoryName == categoryName);
        }


        public async Task<bool> Update(Category entity)
        {
            return (await _context.SaveChangesAsync() > 0);
        }
    }
}
