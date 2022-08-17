using RetailPosApi.Model.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface IRepositoryBase<T,E>
    {
        Task<PagedList<T>> GetAll(E entity);
        Task<T> Get(int id);
        Task<bool> Create(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(T entity);
    }
}
