using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using RetailPosApi.CustomValidation;
using RetailPosApi.Dtos.AuthDto;
using RetailPosApi.Model;
using RetailPosApi.Model.AuthModel;
using RetailPosApi.Service.AuthService;
using System;
using System.Net.Mime;
using RetailPosApi.Dtos.V1.AuthDtos;
using System.Collections.ObjectModel;

namespace RetailPosApi.Controllers
{
    [ApiVersion("1.0")]
    [Authorize]
    [Route("api/v{version:apiVersion}/[controller]")]
            [EnableCors("AnotherPolicy")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _repository;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        /// <summary>
        /// Register User
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Code 200</returns>
        [HttpPost("Register")]
        [Authorize(Roles = "Admin")]
        [ServiceFilter(typeof(ValidateModelAttribute))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult Register(UserRegisterDto request)
        {
            _repository.Register(new User { UserName = request.Username, Role = request.Role }, request.Password);
            _repository.SaveChanges();
            return Ok();
        }
        /// <summary>
        /// Login User And Create a JWT token 
        /// </summary>
        /// <param name="authenticateRequest"></param>
        /// <returns>Code 200</returns>
        [AllowAnonymous]
        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<User> Login([FromBody] AuthenticateRequest authenticateRequest)
        {
            var response = _repository.LogIn(authenticateRequest, IpAddress());
            if (response == null)
            {
                return BadRequest(new { message = "Username or Password Incorrect" });
            }
            SetTokenCookie(response.RefreshToken);
            return Ok(response);
        }

        /// <summary>
        /// Return a all User 
        /// </summary>
        /// <returns>Code 200 and Code 404</returns>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Get()
        {
            var account = _repository.GetAllAccount();
            if (account != null)
            {
                return Ok(_mapper.Map<ReadOnlyCollection<UserReadDto>>(account));
            }
            return NotFound();
        }

        /// <summary>
        /// Return a User for a Given Account ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Code 200 and Code 404</returns>
        [Authorize(Roles = "User, Admin")]
        [HttpGet("Account/{id}", Name = "GetAccountId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult GetId(int id)
        {
            var account = _repository.GetAccountId(id);
            if (account != null)
            {
                return Ok(_mapper.Map<UserReadDto>(account));
            }
            return NotFound();
        }
        /// <summary>
        /// Delete User for A Given Account ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Code 204, Code 404</returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult<User> Delete(int id)
        {
            var account = _repository.GetAccountId(id);
            if (account == null)
            {
                return NotFound();
            }
            _repository.DeleteAccount(account);
            _repository.SaveChanges();
            return NoContent();
        }
        /// <summary>
        /// Update User for A Given Account ID
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userUpdateDto"></param>
        /// <returns>Code 204, Code 404</returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidateModelAttribute))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult UpdateAccount([FromRoute] int id, [FromBody] UserUpdateDto userUpdateDto)
        {
            var account =  _repository.GetAccountId(id);
            if (account == null)
            {
                return NotFound();

            }
            var user = _mapper.Map(userUpdateDto, account);
             _repository.Update(user, userUpdateDto.Password);
            var updated = _repository.SaveChanges();

            if (updated)
                return Ok();

            return NoContent();
        }


        /// <summary>
        /// Remote Model Validation Check if Username Exist
        /// </summary>
        /// <param name="userName"></param>
        /// <returns>Boolean</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{IsUserExist}", Name = nameof(IsUserExist))]
        public IActionResult IsUserExist(string userName)
        {
            var validateName = _repository.IsUserExists(userName);
            if (validateName)
            {
                return Json(false);
            }
            else
            {
                return Json(true);
            }
        }
        /// <summary>
        /// Remote Model Validation Check if User's Role
        /// </summary>
        /// <param name="role"></param>
        /// <returns>Boolean</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{IsRoleExist}", Name = nameof(IsRoleExist))]
        public IActionResult IsRoleExist(string role)
        {
            var validateName = _repository.IsRoleExists(role);
            if (!validateName)
            {
                return Json(false);
            }
            else
            {
                return Json(true);
            }
        }


        // helper methods
        /// <summary>
        /// Creating Token Cookie
        /// </summary>
        /// <param name="token"></param>
        private void SetTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
        private string IpAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
