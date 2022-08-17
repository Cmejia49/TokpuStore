using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using RetailPosApi.Contracts;
using RetailPosApi.Dtos.ItemDtos;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using RetailPosApi.Service;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RetailPosApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [EnableCors("AnotherPolicy")]
    [ApiController]
    public class ItemController : Controller
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _memoryCache;
        public ItemController(IRepositoryWrapper repository, IMapper mapper, IMemoryCache memoryCache)
        {
            _repository = repository;
            _mapper = mapper;
            _memoryCache = memoryCache;
  
        }
        /// <summary>
        /// Get All Item
        /// </summary>
        /// <returns></returns>
        [HttpGet("item")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllItem([FromQuery] ItemParameter itemParameter)
        {

            var itemList = await Validate(itemParameter);
            var metadata = new
            {
                itemList.TotalCount,
                itemList.PageSize,
                itemList.CurrentPage,
                itemList.TotalPages,
                itemList.HasNext,
                itemList.Type,
                itemList.HasPrevious
            };
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            return Ok(_mapper.Map<IEnumerable<ItemReadDto>>(itemList));
        }

        //helper 
        private async Task<PagedList<Items>> Validate(ItemParameter itemParameter)
        {
                if (itemParameter.CatId != 0)
                {
                return await _repository.Item.GetItemByCat(itemParameter);
                }
                else if (itemParameter.ItemName != null)
                {
                return  await _repository.Item.GetItemByName(itemParameter);
                }
                else
                {
                return await _repository.Item.GetAll(itemParameter);
                }
                
        }

        /// <summary>
        /// Get Item By A Given ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetItem")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetItem(int id)
        {
            var ItemService = await _repository.Item.Get(id);
            if (ItemService != null)
            {
                return Ok(_mapper.Map<SingleItemReadDto>(ItemService));
            }
            return NotFound();
        }

        /// <summary>
        /// GET item for store owners
        /// </summary>
        /// <param name="id"></param>
        /// <param name="storeId"></param>
        /// <returns></returns>
        [Authorize(Roles = "User,Admin")]
        [HttpGet("ItemUser/{id}", Name = "GetItemUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetItemUser(int id,int storeId)
        {
            var ItemService = await _repository.Item.GetItemUser(id,storeId);
            if (ItemService != null)
            {
                return Ok(_mapper.Map<SingleItemReadDto>(ItemService));
            }
            return NotFound();
        }


        /// <summary>
        /// Create Item
        /// </summary>
        /// <param name="fileObj"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ItemReadDto>> CreateItem([FromForm] FileUpload fileObj)
        {
            //Deserialize
            var itemCreateDto = JsonConvert.DeserializeObject<ItemCreateDto>(fileObj.Item);
            ModelState.Clear();
            TryValidateModel(itemCreateDto);
     
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var itemService = _mapper.Map<Items>(itemCreateDto);
                var isSuccess = await _repository.Item.CreateItem(itemService, fileObj.Files);
                if (isSuccess)
                {

                    var itemReadDto = _mapper.Map<ItemReadDto>(itemService);
                    return CreatedAtRoute(nameof(GetItem), new { Id = itemReadDto.ItemId }, itemReadDto);
                   // return Ok();
                }   
            
            return BadRequest();

        }

        /// <summary>
        /// Update Item By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="itemUpdateDto"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UpdateItem([FromRoute]int id, [FromBody]ItemUpdateDto itemUpdateDto)
        {
            var ItemService = await _repository.Item.Get(id);
            if (ItemService == null)
            {
                return NotFound();

            }
            var item = _mapper.Map(itemUpdateDto, ItemService);
            var updated = await _repository.Item.Update(item);

            if (updated)
            {
 
                return Ok(_mapper.Map<ItemReadDto>(item));
            }

            return NoContent();
        }

        /// <summary>
        /// Patch Item By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patchDoc"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PartialItemUpdate(int id, JsonPatchDocument<ItemUpdateDto> patchDoc)
        {
           var itemService = await _repository.Item.Get(id);
     
            if (itemService == null)
            {
                return NotFound();
            }

            var itemToPatch = _mapper.Map<ItemUpdateDto>(itemService);
            patchDoc.ApplyTo(itemToPatch, ModelState);

            if (!TryValidateModel(itemToPatch))
            {
                return ValidationProblem(ModelState);

            }

            _mapper.Map(itemToPatch, itemService);
             await _repository.Item.Update(itemService);
            return NoContent();
        }

        /// <summary>
        /// Delete Item By Given Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteItemAsync(int id)
        {
            var itemService = await _repository.Item.Get(id);
            if (itemService == null)
            {
                return NotFound();
            }
            var delete = await _repository.Item.Delete(itemService);
            if (delete)
            {
        
                return NoContent();
            }
            return BadRequest();
        }

        /// <summary>
        /// Check if Item Name is Exist
        /// </summary>
        /// <param name="ProductName"></param>
        /// <returns></returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        [AcceptVerbs("GET")]
        public ActionResult IsItemExist(string ProductName)
        {

            var validateName =  _repository.Item.IsItemExist(ProductName);
                return Json(!validateName);
        }
    }
}
