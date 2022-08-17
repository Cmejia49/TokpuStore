using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.DamageReportDtos
{
    public class ReadDamageReportDto
    {
        public int DamageId { get; set; }
        public string ProductName { get; set; }
        public int ItemPrice { get; set; }
        public int StockFid { get; set; }
        public int Quantity { get; set; }
        public string CreateDate { get; set; }
    }
}
