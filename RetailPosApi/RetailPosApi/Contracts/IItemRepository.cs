using Microsoft.AspNetCore.Http;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface IItemRepository:IRepositoryBase<Items,ItemParameter>
    {
        Task<Items> GetItemUser(int id,int storeId);
        Task<PagedList<Items>> GetItemByName(ItemParameter itemParameter);
        Task<PagedList<Items>> GetItemByCat(ItemParameter itemParameter);
        Task<bool> CreateItem(Items item, List<IFormFile> files);
        bool IsItemExist(string ItemName);
    }
}
