using RetailPosApi.Model.V1;
using RetailPosApi.Model.V1.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface IDashBoardRepository
    {
        Task<IEnumerable<ReportSummary>> SaleSummary(int id,string option);
        Task<IEnumerable<ReportSummary>> DamageSummary(int id,string option);
        Task<IEnumerable<ReportSummary>> ExpensesSummary(int id,string option);

        Task<ReportSummary> GetSummary(int id,string option);

    }
}
