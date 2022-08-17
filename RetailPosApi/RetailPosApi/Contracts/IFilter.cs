using RetailPosApi.Model.Helper;
using RetailPosApi.Model.V1.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface IFilter<T> where T : class
    {
        Task<PagedList<T>> GetByDay(FilterParameter filterParameter);
        Task<PagedList<T>> GetByDate(FilterParameter filterParameter);
    }
}
