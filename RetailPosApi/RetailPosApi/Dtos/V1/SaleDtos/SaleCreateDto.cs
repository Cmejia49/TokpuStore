using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.SaleDto
{
    public class SaleCreateDto
    {
        public string ProductName { get; set; }
        public string ItemCode { get; set; }
        [Display(Name = "Price")]
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int Price { get; set; }
        [Display(Name = "Quantity")]
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int Quantity { get; set; }
        public int StockFid { get; set; }

    }
}
