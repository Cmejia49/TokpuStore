using RetailPosApi.CustomValidation;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Dtos.AuthDto
{
    public class UserRegisterDto
    {
        [Required]
        [StringLength(20, MinimumLength = 4)]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Invalid Username")]
        [CustomRemoteAttribute("IsUserExist", "Auth",
         ErrorMessage = "Username already exists")]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [StringLength(6, MinimumLength = 4)]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Invalid Role Name")]
        [CustomRemoteAttribute("IsRoleExist", "Auth",
       ErrorMessage = "Only 3 Admin User Can Register")]
        public string Role { get; set; }
    }
}
