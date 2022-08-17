using RetailPosApi.CustomValidation;
using RetailPosApi.Dtos.StockDtos;
using RetailPosApi.Dtos.V1.VariantDtos;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.ItemDtos
{
    public class ItemUpdateDto
    {
        public string ItemName { get; set; }

        public List<StockUpdateDto> StockList { get; set; }
        public List<CreateVariantDto> VariantList { get; set; }
        [Required]
        public int CatFId { get; set; }
    }
}
