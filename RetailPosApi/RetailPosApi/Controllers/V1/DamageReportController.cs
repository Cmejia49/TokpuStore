using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using RetailPosApi.Contracts;
using RetailPosApi.Dtos.DamageReportDtos;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using RetailPosApi.Model.V1.Parameter;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace RetailPosApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
      [EnableCors("AnotherPolicy")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    public class DamageReportController : Controller
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        public DamageReportController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;

        }


        /// <summary>
        /// Report Damage Item
        /// </summary>
        /// <param name="damageReportDto"></param>
        /// <returns>Code 200</returns>
        [Authorize(Roles = "User,Admin")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddDamageReport(CreateDamageReportDto damageReportDto)
        {
            var damageReportService = _mapper.Map<Damage>(damageReportDto);
           var damage =  await _repository.Damage.Create(damageReportService);
            if (damage)
                return Ok();

            return BadRequest();
        }

        /// <summary>
        /// Get All Damage Report 
        /// </summary>
        /// <returns>Code 200</returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllDamageReport([FromQuery] FilterParameter filterParameter)
        {
            PagedList<Damage> damageReportService;
            if (!string.IsNullOrEmpty(filterParameter.Day.ToString()))
            {
                damageReportService = await _repository.Damage.GetByDay(filterParameter);
            }
            else if (!string.IsNullOrEmpty(filterParameter.DateTime.ToString()))
            {
                damageReportService = await _repository.Damage.GetByDate(filterParameter);
            }
            else
            {
                damageReportService = await _repository.Damage.GetAll(filterParameter);
            }
            var metadata = new
            {
                damageReportService.TotalCount,
                damageReportService.PageSize,
                damageReportService.CurrentPage,
                damageReportService.TotalPages,
                damageReportService.HasNext,
                damageReportService.Type,
                damageReportService.HasPrevious
            };
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            return Ok(_mapper.Map<IEnumerable<ReadDamageReportDto>>(damageReportService));
        }

        /// <summary>
        /// Get Damage Item By Given ID Return Not Found if ID not exist
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet("{id}", Name = "GetDamageReportId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDamageReport(int id)
        {
            var damageReportService = await _repository.Damage.Get(id);
            if (damageReportService != null)
            {
                return Ok(_mapper.Map<ReadDamageReportDto>(damageReportService));
            }
            return NotFound();
        }
        /// <summary>
        /// Delete Damage Item By Given ID return Not Found if Id not Exist
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var damageReportService = await _repository.Damage.Get(id);
            if (damageReportService == null)
            {
                return NotFound();
            }
             await _repository.Damage.Delete(damageReportService);
            
                return NoContent();
        }
    }
}
