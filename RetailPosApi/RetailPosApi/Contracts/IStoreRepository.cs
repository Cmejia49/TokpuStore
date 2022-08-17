using RetailPosApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface IStoreRepository:IRepositoryBase<Store, QueryStringParameters>
    {
        Task<IReadOnlyCollection<Store>> GetAllStore();
    }
}
