using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Model.V1
{
    public class ReportSummary
    {

        public int TotalRevenue { get; set; }
        public int TotalCost { get; set; }
        public int TotalQuantity { get; set; }
        public string Date { get; set; } // this is for the month 
        public int TotalSale { get; set; }
        public int TotalDamage { get; set; }
        public int TotalExpenses { get; set; }
        public int TotalProfit { get; set; }
        public int NetIncome { get; set; }
        public int NumOfTransac { get; set; }
    }
}
