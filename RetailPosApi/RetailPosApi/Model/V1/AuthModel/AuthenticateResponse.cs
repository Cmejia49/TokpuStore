using System.Text.Json.Serialization;

namespace RetailPosApi.Model.AuthModel
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(User user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            Username = user.UserName;
            Role = user.Role;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
