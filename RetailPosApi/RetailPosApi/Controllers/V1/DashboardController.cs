using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RetailPosApi.Contracts;
using Microsoft.AspNetCore.Cors;
using RetailPosApi.Dtos.V1.ReportSummaryDtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using RetailPosApi.Model.V1;
using RetailPosApi.Model.V1.Parameter;

namespace RetailPosApi.Controllers.V1
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Authorize(Roles = "User,Admin")]
    [EnableCors("AnotherPolicy")]
    public class DashboardController : Controller
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        public DashboardController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("Sale")]
        public async Task<IActionResult> GetSale([FromQuery] FilterDay filter, [FromQuery]int id)
        {
            if (string.IsNullOrEmpty(filter.ToString()))
            {
                return BadRequest();
            }
            var sale = await _repository.Dashboard.SaleSummary(id,filter.ToString());
            return Ok(_mapper.Map<IReadOnlyCollection<ReadSaleReportDto>>(sale));

        }
        [HttpGet("Damage")]
        public async Task<IActionResult> GetDamage([FromQuery] FilterDay filter, [FromQuery] int id)
        {
            if (string.IsNullOrEmpty(filter.ToString()))
            {
                return BadRequest();
            }
            var damage = await _repository.Dashboard.DamageSummary(id,filter.ToString());
            return base.Ok(_mapper.Map<IReadOnlyCollection<ReadDamageReportDto>>(damage));

        }
        [HttpGet("Expenses")]
        public async Task<IActionResult> GetExpenses([FromQuery] FilterDay filter, [FromQuery] int id)
        {
            if (string.IsNullOrEmpty(filter.ToString()))
            {
                return BadRequest();
            }
            var expenses = await _repository.Dashboard.ExpensesSummary(id,filter.ToString());
            return Ok(_mapper.Map<IReadOnlyCollection<ReadExpensesReportDto>>(expenses));

        }

        [HttpGet("Report")]
        public async Task<IActionResult> GetReport([FromQuery] FilterDay filter, [FromQuery] int id)
        {
            if (string.IsNullOrEmpty(filter.ToString()))
            {
                return BadRequest();
            }
                var generalReport = await _repository.Dashboard.GetSummary(id,filter.ToString());
            return Ok(_mapper.Map<ReadGeneralReportDto>(generalReport));

        }


    }
}
