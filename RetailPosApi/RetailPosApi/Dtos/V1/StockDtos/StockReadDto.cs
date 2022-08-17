
using RetailPosApi.Dtos.StoreDto;

namespace RetailPosApi.Dtos.StockDtos
{
    public class StockReadDto
    {
        public int StockId { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public string StockIndex { get; set; }
        public string ItemCode { get; set; }
        public int StoreFid { get; set; }
        
        
    }
}
