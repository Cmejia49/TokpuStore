
using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class Stock
    {
        [Key]
        public int StockId { get; set; }
        [Display(Name = "Number of Stock")]
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int Quantity { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int Price { get; set; }
        [Display(Name = "Item Code")]
        [Required]
        [RegularExpression("^[D,A,N,T,E,M,O,J,I,S]{1,10}$", ErrorMessage = "Invalid Item Code")]
        public string ItemCode { get; set; }
        public string StockIndex { get; set; }
        public int ItemFid { get; set; }
        public Items Item { get; set; }
        public int StoreFid { get; set; }
        public Store Store { get; set; }

    }
}
