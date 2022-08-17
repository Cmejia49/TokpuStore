using AutoMapper;
using RetailPosApi.Dtos.AuthDto;
using RetailPosApi.Dtos.V1.AuthDtos;
using RetailPosApi.Model;

namespace RetailPosApi.Profiles
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<User, UserRegisterDto>();
            CreateMap<User, UserLoginDto>();
            CreateMap<User, UserReadDto>();
            CreateMap<UserUpdateDto, User>();
        }
    }
}
