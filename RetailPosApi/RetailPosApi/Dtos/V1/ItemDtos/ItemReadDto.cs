using RetailPosApi.Dtos.V1.ImagesDtos;
using System.Collections.Generic;


namespace RetailPosApi.Dtos.ItemDtos
{
    public class ItemReadDto
    {

        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string PriceRange { get; set; }
        public IReadOnlyCollection<ReadImagesDto> ImageList { get; set; }

    }
}
