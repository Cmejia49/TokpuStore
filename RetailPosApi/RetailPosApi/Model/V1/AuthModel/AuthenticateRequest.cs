using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model.AuthModel
{
    public class AuthenticateRequest
    {

        [Required]
        [StringLength(20, MinimumLength = 4)]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Invalid UserName")]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
