using AutoMapper;
using Newtonsoft.Json;
using RetailPosApi.DataAccess;
using RetailPosApi.Dtos.AuthDto;
using RetailPosApi.Dtos.ExpensesDtos;
using RetailPosApi.Dtos.ItemDtos;
using RetailPosApi.Model;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace RetailPosApi
{
    public class Seeder
    {
        public static void Seedit(ItemContext context, IMapper mapper)
        {

            if (!context.Users.Any())
            {
/*                var itemsJSON = System.IO.File.ReadAllText(@"Seed" + Path.DirectorySeparatorChar + "GeneratedItem.json");
                UserRegisterDto itemList = JsonConvert.DeserializeObject<List<UserRegisterDto>>(itemsJSON);*/
                CreatePasswordHash("624545123Qw!", out byte[] passwordHash, out byte[] passwordSalt);
                var mapped = new User { UserName = "Admin", Role = "Admin" , PasswordHash = passwordHash, PasswordSalt = passwordSalt };
                context.Users.Add(mapped);
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
