using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.ImagesDtos
{
    public class ReadImagesDto
    {
        public int ImageId { get; set; }
        public string ImageSrc { get; set; }
        public string ImageName { get; set; }
        public string ImageDirectoryPath { get; set; }
        public string ImageDevicePath { get; set; }
    }
}
