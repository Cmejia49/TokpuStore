
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model.V1
{
    public class Variants
    {
        [Key]
        public int VarietyId { get; set; }
        public string VarietyName { get; set; }
        public int ItemFid { get; set; }
        public Items Item { get; set; }
        public List<Options> Options { get; set; }
    }
}
