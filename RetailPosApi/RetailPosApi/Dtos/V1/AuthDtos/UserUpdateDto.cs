using RetailPosApi.CustomValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.AuthDtos
{
    public class UserUpdateDto
    {
        [Required]
        [StringLength(20, MinimumLength = 4)]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Invalid Username")]
        [CustomRemoteAttribute("IsUserExist", "Auth",
        ErrorMessage = "Username already exists")]
        public string Username { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
