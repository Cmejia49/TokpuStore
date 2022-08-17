using RetailPosApi.Dtos.CategoryDto;
using RetailPosApi.Dtos.StockDtos;
using RetailPosApi.Dtos.V1.ImagesDtos;
using RetailPosApi.Dtos.V1.VariantDtos;
using System.Collections.Generic;

namespace RetailPosApi.Dtos.ItemDtos
{
    public class SingleItemReadDto
    {

        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string PriceRange { get; set; }
        public CategoryReadDto Categories { get; set; }
        public IReadOnlyCollection<StockReadDto> StockList { get; set; }     

        public IReadOnlyCollection<ReadVariantDto> VariantList { get; set; }
        public IReadOnlyCollection<ReadImagesDto> ImageList { get; set; }
    }
}
