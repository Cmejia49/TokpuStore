using RetailPosApi.CustomValidation;
using RetailPosApi.Model.V1;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class Items
    {
        [Key]
        public int ItemId { get; set; }
        [Display(Name = "Item Name")]
        [RegularExpression("^[A-Za-z_\\s]*$", ErrorMessage = "Invalid Item Name")]
        [CustomRemoteAttribute("IsItemExist", "Item",
        ErrorMessage = "Product Name already exists")]
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string PriceRange { get; set; }
        //Navigation Property
        [Required]
        public int CatFId { get; set; }
        public virtual Category Category { get; set; }
        public List<Stock> StockList { get; set; }
        public List<Variants> VariantList { get; set; }
        public List<Images> ImageList { get; set; }
    }
}
