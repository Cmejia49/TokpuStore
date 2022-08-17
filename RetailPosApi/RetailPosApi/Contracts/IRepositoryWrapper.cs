using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface IRepositoryWrapper
    {
        IItemRepository Item { get; }
        ICategoryRepository Category { get; }
        ISaleRepository Sale { get; }
        IStoreRepository Store { get; }
        IExpensesRepository Expenses { get; }
        IDamageRepository Damage { get; }
        IDashBoardRepository Dashboard { get; }
    }
}
