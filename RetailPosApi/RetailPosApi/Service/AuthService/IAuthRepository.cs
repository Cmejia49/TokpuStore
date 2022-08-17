using RetailPosApi.Model;
using RetailPosApi.Model.AuthModel;
using System.Collections.Generic;

namespace RetailPosApi.Service.AuthService
{
    public interface IAuthRepository
    {
        void Register(User user, string password);
        AuthenticateResponse LogIn(AuthenticateRequest authenticateRequest, string ipAddress);
        IReadOnlyCollection<User> GetAllAccount();
        User GetAccountId(int id);
        void DeleteAccount(User user);
        void Update(User user, string password);
        bool IsUserExists(string username);
        bool IsRoleExists(string role);
        bool SaveChanges();
    }
}
