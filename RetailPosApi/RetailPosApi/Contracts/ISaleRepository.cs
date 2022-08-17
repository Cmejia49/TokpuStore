using RetailPosApi.Model;
using RetailPosApi.Model.V1.Parameter;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface ISaleRepository:IRepositoryBase<Sale,FilterParameter>,IFilter<Sale>
    {
        Task<bool> CreateSaleItem(List<Sale> sale);
    }
}
