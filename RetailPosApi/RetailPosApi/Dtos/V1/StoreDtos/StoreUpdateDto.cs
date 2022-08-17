using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.StoreDto
{
    public class StoreUpdateDto
    {
        [Required]
        public string StoreName { get; set; }
        public int UserFid { get; set; }
    }
}
