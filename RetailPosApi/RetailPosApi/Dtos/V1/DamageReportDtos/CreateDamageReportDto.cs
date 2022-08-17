using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.DamageReportDtos
{
    public class CreateDamageReportDto
    {
        public string ProductName { get; set; }
        public int ItemPrice { get; set; }
        [Display(Name = "Quantity")]
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int Quantity { get; set; }
        public int StockFid { get; set; }
    }
}
