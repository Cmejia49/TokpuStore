using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.SaleDtos
{
    public class SaleReportDto
    {

        public int TotalNumSales { get; set; }
        public int TotalValSales { get; set; }
        public int TotalCost { get; set; }
        public int TotalProfit { get; set; }
    }
}
