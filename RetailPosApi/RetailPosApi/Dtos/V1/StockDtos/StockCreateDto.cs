using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.StockDtos
{
    public class StockCreateDto
    {
        [Required]
        public int StoreFid { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int Quantity { get; set; }
        public int Price { get; set; }
        [Required]
        [RegularExpression("^[D,A,N,T,E,M,O,J,I,S]{1,10}$", ErrorMessage = "Invalid Item Code")]
        public string ItemCode { get; set; }
        public string StockIndex { get; set; }
    }
}
