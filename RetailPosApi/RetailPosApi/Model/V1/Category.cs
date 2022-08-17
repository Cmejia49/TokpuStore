using Newtonsoft.Json;
using RetailPosApi.CustomValidation;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class Category
    {
        [Key]
        public int CatId { get; set; }
        [Display(Name = "Category Name")]
        [Required]
        [StringLength(50, MinimumLength = 4)]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Invalid Category Name")]
        [CustomRemoteAttribute("IsCategoryNameExist", "ItemCategories",
        ErrorMessage = "Category Name already exists")]
        public string CategoryName { get; set; }
        //navigation property   
        public List<Items> ItemList { get; set; }
    }

}
