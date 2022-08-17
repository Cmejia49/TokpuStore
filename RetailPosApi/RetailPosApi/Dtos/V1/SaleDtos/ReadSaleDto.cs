using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.SaleDto
{
    public class ReadSaleDto
    {
        [Key]
        public int SaleId { get; set; }
        public string ProductName { get; set; }
        public string StoreName { get; set; }
        public string ItemCode { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string CreateDate { get; set; }
    }
}
