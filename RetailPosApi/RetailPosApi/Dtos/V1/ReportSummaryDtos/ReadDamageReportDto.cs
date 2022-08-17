using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.ReportSummaryDtos
{
    public class ReadDamageReportDto
    {
        public string Date { get; set; }
        public int TotalCost { get; set; }
        public int TotalQuantity { get; set; }
          public int NumOfTransac { get; set; }
    }
}
