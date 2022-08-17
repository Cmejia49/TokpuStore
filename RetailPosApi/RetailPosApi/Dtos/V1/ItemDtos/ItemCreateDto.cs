using RetailPosApi.CustomValidation;
using RetailPosApi.Dtos.StockDtos;
using RetailPosApi.Dtos.V1.VariantDtos;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.ItemDtos
{
    public class ItemCreateDto
    {
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string PriceRange { get; set; }

        public List<StockCreateDto> StockList { get; set; }
        public List<CreateVariantDto> VariantList { get; set; }
        [Required]
        public int CatFId { get; set; }
    }
}
