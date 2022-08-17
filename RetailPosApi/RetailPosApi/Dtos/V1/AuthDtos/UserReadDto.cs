using RetailPosApi.Dtos.StoreDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.AuthDtos
{
    public class UserReadDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public StoreReadDto Store { get; set; }

    }
}
