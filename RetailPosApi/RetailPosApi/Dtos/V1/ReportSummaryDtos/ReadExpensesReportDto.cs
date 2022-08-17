using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.ReportSummaryDtos
{
    public class ReadExpensesReportDto
    {
        public string Date { get; set; }
        public int TotalExpenses { get; set; }
        public int NumOfTransac { get; set; }
    }
}
