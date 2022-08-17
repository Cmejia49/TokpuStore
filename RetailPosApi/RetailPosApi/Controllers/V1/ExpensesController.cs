using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RetailPosApi.Contracts;
using RetailPosApi.Dtos.ExpensesDtos;
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
    public class ExpensesController : Controller
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        public ExpensesController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;

        }

        /// <summary>
        /// Get All Damage Report 
        /// </summary>
        /// <returns>Code 200</returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllExpenses([FromQuery] FilterParameter filterParameter)
        {

            PagedList<Expenses> expensesService;
            if (!string.IsNullOrEmpty(filterParameter.Day.ToString()))
            {
                expensesService = await _repository.Expenses.GetByDay(filterParameter);
            }
            else if (!string.IsNullOrEmpty(filterParameter.DateTime.ToString()))
            {
                expensesService = await _repository.Expenses.GetByDate(filterParameter);
            }
            else
            {
                expensesService = await _repository.Expenses.GetAll(filterParameter);
            }

            var metadata = new
            {
                expensesService.TotalCount,
                expensesService.PageSize,
                expensesService.CurrentPage,
                expensesService.TotalPages,
                expensesService.HasNext,
                expensesService.Type,
                expensesService.HasPrevious
            };
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            return Ok(_mapper.Map<IEnumerable<ReadExpensesDto>>(expensesService));
        }


        /// <summary>
        /// Report Damage Item
        /// </summary>
        /// <param name="expenses"></param>
        /// <returns>Code 200</returns>
        [Authorize(Roles = "User,Admin")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddExpenses(CreateExpensesDto expenses)
        {
            var expensesService = _mapper.Map<Expenses>(expenses);
            var res =  await _repository.Expenses.Create(expensesService);
            if (res)
            {
                return Ok();
            }
            return BadRequest();
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
        public async Task<IActionResult> DeleteExpenses(int id)
        {
            var expensesService = await _repository.Expenses.Get(id);
            if (expensesService == null)
            {
                return NotFound();
            }
           var expenses = await _repository.Expenses.Delete(expensesService);
            if (!expenses)
            {
                return BadRequest();
            }
            return NoContent();
        }

    }
}
