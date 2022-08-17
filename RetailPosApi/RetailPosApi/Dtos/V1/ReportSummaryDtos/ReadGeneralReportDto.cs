using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.ReportSummaryDtos
{
    public class ReadGeneralReportDto
    {
        public int TotalCost { get; set; }
        public int TotalExpenses { get; set; }
        public int TotalSale { get; set; }
        public int TotalDamage { get; set; }
        public int TotalProfit { get; set; }
        public int NetIncome { get; set; }
        public int NumOfTransac { get; set; }
    }
}
