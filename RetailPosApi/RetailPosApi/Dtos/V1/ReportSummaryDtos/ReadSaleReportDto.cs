using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.ReportSummaryDtos
{
    public class ReadSaleReportDto
    {
        public string Date { get; set; }
        public int TotalRevenue { get; set; }
        public int NumOfTransac { get; set; }
    }
}
