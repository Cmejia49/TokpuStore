using Microsoft.AspNetCore.Http;
using RetailPosApi.CustomValidation;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class FileUpload
    {
        [AllowedExtensions(new string[] { ".jpg", ".png" })]
        public List<IFormFile> Files { get; set; }
        public string Item { get; set; }
    }
}
