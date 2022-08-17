using RetailPosApi.Model;
using RetailPosApi.Model.V1.Parameter;

namespace RetailPosApi.Contracts
{
    public interface IDamageRepository:IRepositoryBase<Damage, FilterParameter>, IFilter<Damage>
    {

    }
}
