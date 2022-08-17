using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.CartDtos
{
    public class CartReadDto
    {
        public List<string> ItemName { get; set; }
        public List<string> VariationName { get; set; }
        public List<string> VariationValueName { get; set; }
        public List<string> SubVariationName { get; set; }
        public List<string> SubVariationValueName { get; set; }
        public List<int> Price { get; set; }
        [Display(Name = "Quantity")]
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public List<int> Quantity { get; set; }
        [Display(Name = "SubTotal")]
        public List<int> SubTotal { get; set; }
    }
}
