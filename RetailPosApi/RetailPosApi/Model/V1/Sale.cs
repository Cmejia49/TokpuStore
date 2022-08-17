using RetailPosApi.Contracts;
using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class Sale:ICommonProp
    {
        [Key]
        public int SaleId { get; set; }
        public string ProductName { get; set; }
        public string ItemCode { get; set; }
        public int Price { get; set; }
        [Display(Name = "Quantity")]
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int Quantity { get; set; }
        public int StoreFid { get; set; }
        public Store Store { get; set; }
        public int StockFid { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreateDate { get; set; }
    }
}
