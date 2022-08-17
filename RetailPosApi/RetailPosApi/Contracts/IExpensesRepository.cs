using RetailPosApi.Model;
using RetailPosApi.Model.V1.Parameter;


namespace RetailPosApi.Contracts
{
    public interface IExpensesRepository:IRepositoryBase<Expenses, FilterParameter>,IFilter<Expenses>
    {

    }
}
