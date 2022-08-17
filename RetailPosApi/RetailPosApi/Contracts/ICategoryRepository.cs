using RetailPosApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface ICategoryRepository:IRepositoryBase<Category,ItemParameter>
    {
        Task<IEnumerable<Category>> GetAllCategories();
        Task<bool> IsCategoryNameExist(string categoryName);
    }
}
