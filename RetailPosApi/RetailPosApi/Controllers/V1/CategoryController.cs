using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using RetailPosApi.Contracts;
using RetailPosApi.CustomValidation;
using RetailPosApi.Dtos.CategoryDto;
using RetailPosApi.Model;
using RetailPosApi.Service;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Caching.Memory;
using System;

namespace RetailPosApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [Authorize]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _memoryCache;
        public CategoryController(IRepositoryWrapper repository, IMapper mapper, IMemoryCache memoryCache)
        {
            _repository = repository;
            _mapper = mapper;
            _memoryCache = memoryCache;
        }

        /// <summary>
        /// Return all Categories
        /// </summary>
        /// <returns>Code 200</returns>
        [AllowAnonymous]
        [HttpGet]
            [EnableCors("AnotherPolicy")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCategories()
        {
            var cacheKey = "category";
            if (!_memoryCache.TryGetValue(cacheKey, out IEnumerable<Category> category))
            {
                category =  await _repository.Category.GetAllCategories();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromSeconds(60))
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(120))
                .SetPriority(CacheItemPriority.Normal)
                 .SetSize(1024);
                //setting cache entries
                _memoryCache.Set(cacheKey, category, cacheEntryOptions);
            }
            return Ok(_mapper.Map<IEnumerable<CategoryReadDto>>(category));
        }
        /// <summary>
        /// Return Category By given Id Return Not Found if id not exist
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("{id}", Name = nameof(GetCategoriesID))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CategoryReadDto> GetCategoriesID(int id)
        {
            var CategoriesService = _repository.Category.Get(id);
            if (CategoriesService != null)
            {
                return Ok(_mapper.Map<CategoryReadDto>(CategoriesService));
            }
            return NotFound();
        }
        /// <summary>
        /// Create Category
        /// </summary>
        /// <param name="categoryCreateDto"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateCategories(CategoryCreateDto categoryCreateDto)
        {
            var CategoriesService = _mapper.Map<Category>(categoryCreateDto);
            var create = await _repository.Category.Create(CategoriesService);
            if (!create)
            {
                return BadRequest(new { error = "Bad request"});
            }
            var categoryReadDto = _mapper.Map<CategoryReadDto>(CategoriesService);
            return CreatedAtRoute(nameof(GetCategoriesID), new { Id = categoryReadDto.CatId }, categoryReadDto);
        }
        /// <summary>
        /// Update Category Name By Given ID
        /// </summary>
        /// <param name="id"></param>
        /// <param name="categoryUpdateDto"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateItem(int id, CategoryUpdateDto categoryUpdateDto)
        {
            var categoriesService = await _repository.Category.Get(id);
            if (categoriesService == null)
            {
                return NotFound();

            }
            _mapper.Map(categoryUpdateDto, categoriesService);
          var update = await _repository.Category.Update(categoriesService);
            if (!update)
            {
                return BadRequest(new { error = "Update Failed" });
            }

            return NoContent();
        }
        /// <summary>
        /// PATH Category By Given Id return Not Found if Id not exist
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patchDoc"></param>
        /// <returns></returns>
        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PartialItemUpdate(int id, JsonPatchDocument<CategoryUpdateDto> patchDoc)
        {
            var categoryService = await _repository.Category.Get(id);
            if (categoryService == null)
            {
                return NotFound();
            }

            var categoryToPatch = _mapper.Map<CategoryUpdateDto>(categoryService);
            patchDoc.ApplyTo(categoryToPatch, ModelState);

            if (!TryValidateModel(categoryToPatch))
            {
                return ValidationProblem(ModelState);

            }

            _mapper.Map(categoryToPatch, categoryService);
            var update = await _repository.Category.Update(categoryService);
            if (!update)
            {
                return BadRequest(new { error = "Update failed" });
            }
            return NoContent();
        }

        /// <summary>
        /// Delete Category By Given Id return Not Found if not Exist
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var categoryService = await _repository.Category.Get(id);
            if (categoryService == null)
            {
                return NotFound();
            }
            var delete =await _repository.Category.Delete(categoryService);

            if (!delete)
            {
                return BadRequest(new { error = "Delete failed" });
            }

            return NoContent();
        }

/*        /// <summary>
        /// Remote Model Validation If Category Name Exist Return False else Return True
        /// </summary>
        /// <param name="categoryName"></param>
        /// <returns></returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{CategoryName}", Name = nameof(IsCategoryNameExist))]
        public Task<IActionResult> IsCategoryNameExist(string categoryName)
        {
            var validateName = _repository.IsCategoryNameExist(categoryName);
            if (validateName)
            {
                return Json(true);
            }
            return Json(false);
        }*/
    }
}
