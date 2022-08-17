using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using RetailPosApi.Contracts;
using RetailPosApi.CustomValidation;
using RetailPosApi.Dtos.StoreDto;
using RetailPosApi.Model;
using RetailPosApi.Service.StoreService;
using System.Collections.Generic;
using System.Linq;
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
    public class StoreController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryWrapper _repository;
        public StoreController(IRepositoryWrapper repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }
        /// <summary>
        /// Get All Store
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllStores()
        {
            var storeService = await _repository.Store.GetAllStore();
            return Ok(_mapper.Map<IEnumerable<StoreReadDto>>(storeService));
        }
        /// <summary>
        /// Get Store By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet("{id}", Name = "GetStore")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStore(int id)
        {
            var storeService = await _repository.Store.Get(id);
            if (storeService != null)
            {
                return Ok(_mapper.Map<StoreReadDto>(storeService));
            }
            return NotFound();
        }
        /// <summary>
        /// Create Store
        /// </summary>
        /// <param name="storeCreateDto"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpPost]
        [ServiceFilter(typeof(ValidateModelAttribute))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateStore(StoreCreateDto storeCreateDto)
        {
            var storeService = _mapper.Map<Store>(storeCreateDto);
            var create = await _repository.Store.Create(storeService);
            if (create)
            {
                var storeReadDto = _mapper.Map<StoreReadDto>(storeService);
                return CreatedAtRoute(nameof(GetStore), new { Id = storeReadDto.StoreId }, storeReadDto);
            }
            return BadRequest();
        }
        /// <summary>
        /// Put Store By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="storeUpdateto"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
           [ServiceFilter(typeof(ValidateModelAttribute))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UpdateStore(int id, StoreUpdateDto storeUpdateto)
        {
            var storeService = await _repository.Store.Get(id);
            if (storeService == null)
            {
                return NotFound();
            }
            _mapper.Map(storeUpdateto, storeService);
            await _repository.Store.Update(storeService);

            return NoContent();
        }
        /// <summary>
        /// Patch Store By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patchDoc"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PartialStoreUpdate(int id, JsonPatchDocument<StoreUpdateDto> patchDoc)
        {
            var storeService = await _repository.Store.Get(id);
            if (storeService == null)
            {
                return NotFound();
            }
            var storeToPatch = _mapper.Map<StoreUpdateDto>(storeService);
            patchDoc.ApplyTo(storeToPatch, ModelState);

            if (!TryValidateModel(storeToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(storeToPatch, storeService);
            var update = await _repository.Store.Update(storeService);
            if (!update)
            {
                string messages = string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));

                return BadRequest(new { error = messages });
            }
            return NoContent();
        }
        /// <summary>
        /// Delet Store By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var storeService = await _repository.Store.Get(id);
            if (storeService == null)
            {
                return NotFound();
            }
            var delete = await _repository.Store.Delete(storeService);

            if (!delete)
            {

                return BadRequest(new { error = "Deleting Error" });
            }
            return NoContent();
        }
    }
}
