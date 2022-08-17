using RetailPosApi.Dtos.V1.AuthDtos;

namespace RetailPosApi.Dtos.StoreDto
{
    public class StoreReadDto
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public UserReadDto User { get; set; }

    }
}
