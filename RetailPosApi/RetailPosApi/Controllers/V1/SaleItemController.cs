using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using RetailPosApi.Contracts;
using RetailPosApi.Dtos.SaleDto;
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
    public class SaleItemController : Controller
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        public SaleItemController(IRepositoryWrapper saleRepository, IMapper mapper)
        {
            _repository = saleRepository;
            _mapper = mapper;
        }
        /// <summary>
        /// Get All Sale
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllSales([FromQuery] FilterParameter filterParameter)
        {
            PagedList<Sale> saleService;
            if (!string.IsNullOrEmpty(filterParameter.Day.ToString()))
            {
                saleService = await _repository.Sale.GetByDay(filterParameter);
               

            }
            else if (!string.IsNullOrEmpty(filterParameter.DateTime.ToString()))
            {
                saleService = await _repository.Sale.GetByDate(filterParameter);
            }
            else
            {
                saleService = await _repository.Sale.GetAll(filterParameter);
            }
            var metadata = new
            {
                saleService.TotalCount,
                saleService.PageSize,
                saleService.CurrentPage,
                saleService.TotalPages,
                saleService.HasNext,
                saleService.Type,
                saleService.HasPrevious
            };
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            
            return Ok(_mapper.Map<IEnumerable<ReadSaleDto>>(saleService));
        }

        /// <summary>
        /// Get Sale By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet("{id}", Name = "GetSaleId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetSale(int id)
        {
            var saleService = await _repository.Store.Get(id);
            if (saleService != null)
            {
                return Ok(_mapper.Map<ReadSaleDto>(saleService));
            }
            return NotFound();
        }

        /// <summary>
        /// Create Sale
        /// </summary>
        /// <param name="sale"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateSale(List<SaleCreateDto> sale)
        {
            var saleService = _mapper.Map<List<Sale>>(sale);
            var create = await _repository.Sale.CreateSaleItem(saleService);
            if (create)
                return Ok();

            return BadRequest();
            
        }

        /// <summary>
        /// Delete Sale By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var saleService = await _repository.Sale.Get(id);
            if (saleService == null)
            {
                return NotFound();
            }
           var delete =  await _repository.Sale.Delete(saleService);
            if (delete)
                return NoContent();

            return BadRequest();
        }
    }
}
