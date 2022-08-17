using RetailPosApi.CustomValidation;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.CategoryDto
{
    public class CategoryCreateDto
    {
        [Display(Name = "Category Name")]
        [Required]
        [StringLength(50, MinimumLength = 4)]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Invalid Category Name")]
   /*     [CustomRemoteAttribute("IsCategoryNameExist", "ItemCategories",
           ErrorMessage = "Category Name already exists")]*/
        public string CategoryName { get; set; }

    }
}
