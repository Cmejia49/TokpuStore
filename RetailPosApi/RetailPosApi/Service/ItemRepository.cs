using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using RetailPosApi.Model.V1;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RetailPosApi.Service
{
    public class ItemRepository :IItemRepository
    {
        private readonly ItemContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private int id;
        public ItemRepository(ItemContext context, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
            id = GetUserId(); 
        }


        public async Task<bool> CreateItem(Items item, List<IFormFile> files)
        {
            if (item == null)
            {
                return false;
            }
            if (files != null)
            {
                List<Images> images = new List<Images>();
                int i = 0;
                foreach (var img in files)
                {
                    var fileName = CreateFileName(img, item.ItemName + i);
                    SavingFile(img, fileName);
                    images.Add(new Images()
                    {
                        ImageName = fileName,
                        ImageDirectoryPath = "~/uploads/" + fileName,
                        ImageDevicePath = "~/uploads/" + fileName,
                    });
                    i++;
                }

                item.ImageList = images;

            }
            _context.Item.Add(item);
            return ( await _context.SaveChangesAsync() > 0);

        }

        public async Task<bool> Delete(Items entity)
        {
            if (entity == null)
            {
                return false;
            }
            DeleteImg(entity.ImageList);
            _context.Item.Remove(entity);
            return (await _context.SaveChangesAsync() > 0);
        }


        public async Task<PagedList<Items>> GetAll(ItemParameter entity)
        {

            return  await PagedList<Items>.ToPagedList( _context.Item
                .Include(s => s.ImageList)
                .AsSplitQuery()
                .OrderBy(on => on.ItemName),
               entity.PageNumber, entity.PageSize, entity.Type);
        }
        public async Task<Items> Get(int id)
        {
            return await _context.Item
                .Include(s => s.Category)
                .Include(s => s.VariantList)
                    .ThenInclude(s => s.Options)
                .Include(s => s.ImageList)
                .Include(s => s.StockList)
                 .OrderBy(x => x.ItemName)
                .AsSplitQuery()
                .FirstOrDefaultAsync(i => i.ItemId == id);
       
        }
        
        public async Task<Items> GetItemUser(int id,int storeId)
        {
            return await _context.Item
                 .Include(s => s.VariantList)
                    .ThenInclude(s => s.Options)
                .Include(s => s.ImageList)
                .Include(s => s.StockList.Where(s => s.StoreFid == storeId))
                .OrderBy(x => x.ItemName)
                .AsSplitQuery()
                .FirstOrDefaultAsync(i => i.ItemId == id);
        }

      
        public async Task<PagedList<Items>> GetItemByName(ItemParameter itemParameter)
        {
            var item = _context.Item
                .Include(s => s.ImageList)
                .AsSplitQuery()
                .Where(i => i.ItemName.ToLower().Contains(itemParameter.ItemName.Trim().ToLower()))
                .OrderBy(x=>x.ItemName);


            return await PagedList<Items>.ToPagedList(item, itemParameter.PageNumber,
                itemParameter.PageSize,
                itemParameter.Type);
        }

        public async Task<PagedList<Items>> GetItemByCat(ItemParameter itemParameter)
        {

            var item = _context.Item
                     .Include(s => s.ImageList)
                .AsSplitQuery()
                .Where(x => x.CatFId == itemParameter.CatId).OrderBy(x=>x.ItemName);

            return await PagedList<Items>.ToPagedList(item, itemParameter.PageNumber,
                itemParameter.PageSize,
                itemParameter.Type);
        }

        public bool IsItemExist(string ItemName)
        {

            if (ItemName != null)
            {
                return  _context.Item.Where(i => i.ItemName == ItemName).Any();
            }
            return false;
        }

        public async Task<bool> Update(Items entity)
        {
            _context.Item.Update(entity);
            return (await _context.SaveChangesAsync() > 0);
        }


        //helper method
        private void SavingFile(IFormFile file, string itemName)
        {

            //Checking the files length
            if (file.Length > 0 && file.Length < int.MaxValue)
            {
                //Creating Directory Path
                string path = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot","uploads/");
                //Checking if Directory Exists
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                using (var stream = file.OpenReadStream())
                {
                    //Saving Image to Directory
                    var newImage = GetReducedImage(850, 800, stream);
                    newImage.Save(path + itemName);
                    stream.Flush();
                }
            }
        }

        public Image GetReducedImage(int width, int height, Stream resourceImage)
        {
            try
            {
                var image = Image.FromStream(resourceImage);
                var thumb = image.GetThumbnailImage(width, height, () => false, IntPtr.Zero);

                return thumb;
            }
            catch (Exception)
            {
                return null;
            }
        }
        private string CreateFileName(IFormFile file, string itemName)
        {
            var fullFileName = file.FileName;
            var fileName = itemName;
            var ext = fullFileName.Split('.').LastOrDefault();
            var fileNew = fileName + "." + ext;
            var removeSpace = fileNew.Replace(" ","");
            return removeSpace;
        }

        private void DeleteImg(IReadOnlyCollection<Images> image)
        {

            foreach (var img in image)
            {
                var oldFileName = img.ImageName;
                var newFileName = string.Join('\\', oldFileName);
                var path = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", "uploads/", newFileName);
                File.Delete(path);
            }

        }

        private int GetUserId()
        {
            var temp = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (temp == null)
                return -1;

            return int.Parse(temp);
        }

        public Task<bool> Create(Items entity)
        {
            throw new NotImplementedException();
        }

      
    }
}
