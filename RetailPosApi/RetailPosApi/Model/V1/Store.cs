using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class Store
    {
        [Key]
        public int StoreId { get; set; }
        [Display(Name = "Store Name")]
        [StringLength(50, MinimumLength = 3)]
        public string StoreName { get; set; }
        //Navigation Property
        public int? UserFid { get; set; }
        public User User { get; set; }
        public List<Expenses> ExpensesList { get; set; }
        public List<Damage> DamageList { get; set; }
        public List<Stock> StockList { get; set; }
        public List<Sale> SaleList { get; set; }
    }
}
