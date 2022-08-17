using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.StoreDto
{
    public class StoreCreateDto
    {
        [Required]
        public string StoreName { get; set; }

        public int? UserFid { get; set; }
    }
}
