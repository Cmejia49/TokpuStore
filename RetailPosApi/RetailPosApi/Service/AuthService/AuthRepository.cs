using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.AuthModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RetailPosApi.Service.AuthService
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ItemContext _context;
        private readonly IConfiguration _configuration;
        public AuthRepository(ItemContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public AuthenticateResponse LogIn(AuthenticateRequest authenticateRequest, string ipAddress)
        {
            User user = _context.Users
                 .Include(s => s.Store)
                .FirstOrDefault(x => x.UserName.ToLower().Equals(authenticateRequest.Username.ToLower()));
            if (user == null)
            {
                return null;
            }
            else if (!VerifyPasswordHash(authenticateRequest.Password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            else
            {
                var jwt = CreateToken(user);
                var refreshToken = CreateRefreshToken(ipAddress);
                return new AuthenticateResponse(user, jwt, refreshToken.Token);
            }

        }

        public void Register(User user, string password)
        {
            if (user == null || password == null)
            {
                throw new ArgumentException(nameof(user), nameof(password));
            }
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
        }

        public IReadOnlyCollection<User> GetAllAccount()
        {
            return _context.Users.ToList();
        }

        public User GetAccountId(int id)
        {
            return _context.Users
                .Include(s => s.Store)
                .FirstOrDefault(i => i.Id == id);
        }
        public void DeleteAccount(User user)
        {
            if (user == null)
            {
                throw new ArgumentException(nameof(user));
            }
            _context.Users.Remove(user);
        }
        public void Update(User user, string password)
        {
            if (user == null || password == null)
            {
                throw new ArgumentException(nameof(user), nameof(password));
            }
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
        }


        public bool IsUserExists(string username)
        {
            var users = _context.Users.Any(x => x.UserName == username);
            if (!users)
            {
                return false;
            }
            return true;
        }

        public bool IsRoleExists(string role)
        {
            if (role == "Admin")
            {
                List<User> users = _context.Users.Where(i => i.Role == "Admin").ToList();
                if (users.Count >= 4)
                {
                    return false;
                }
            }
            return true;
        }
        public bool SaveChanges()
        {
            return (_context.SaveChanges() > 0);
        }

        //Helper Metod
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.Role, user.Role)
    };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Secret").Value));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private RefreshToken CreateRefreshToken(string ipAddress)
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = ipAddress
                };
            }
        }

    }
}
