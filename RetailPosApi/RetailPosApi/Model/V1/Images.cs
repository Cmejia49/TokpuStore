using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Model.V1
{
    public class Images
    {
        [Key]
        public int ImageId { get; set; }
        public string ImageName { get; set; }
        public string ImageDirectoryPath { get; set; }
        public string ImageDevicePath { get; set; }
        public int ItemFid { get; set; }
        public Items Item { get; set; }
    }
}
