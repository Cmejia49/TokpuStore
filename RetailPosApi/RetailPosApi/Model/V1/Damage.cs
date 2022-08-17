using RetailPosApi.Contracts;
using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class Damage:ICommonProp
    {
        [Key]
        public int DamageId { get; set; }
        public string ProductName { get; set; }
        public int ItemPrice { get; set; }
        public int StockFid { get; set; }
        [Display(Name = "Quantity")]
        [Required]
        [RegularExpression("^[0-9]*$", ErrorMessage = "Only Numbers are Accepted")]
        public int Quantity { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreateDate { get; set; }
#nullable disable
        //Navigation Property 
        public int StoreFid { get; set; }
        public Store Store { get; set; }
    }
}
