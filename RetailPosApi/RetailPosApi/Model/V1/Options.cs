using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Model.V1
{
    public class Options
    {
        [Key]
        public int OptionID { get; set; }
        public string OptionName { get; set; }
        public int VariantFid { get; set; }
        public Variants Variant { get; set; }
    }
}
