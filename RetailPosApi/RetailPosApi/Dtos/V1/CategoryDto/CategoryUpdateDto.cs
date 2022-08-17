using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.CategoryDto
{
    public class CategoryUpdateDto
    {
        [Required]
        [MaxLength(50)]
        public string CategoryName { get; set; }
    }
}
