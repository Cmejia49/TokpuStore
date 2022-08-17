using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Service.ExpensesService;
using RetailPosApi.Service.SaleService;
using RetailPosApi.Service.StoreService;
using RetailPosApi.Service.DamageReportService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Service
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private ItemContext _context;
        private IItemRepository _item;
        private ICategoryRepository _category;
        private ISaleRepository _sale;
        private IStoreRepository _store;
        private IExpensesRepository _expenses;
        private IDamageRepository _damage;
        private IDashBoardRepository _dashBoard;
        private IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RepositoryWrapper(ItemContext contex, IWebHostEnvironment webHostEnvironment,IHttpContextAccessor httpContext)
        {
            _context = contex;
            _httpContextAccessor = httpContext;
            _webHostEnvironment = webHostEnvironment;
        }
        public IItemRepository Item
        {
            get
            {
                if (_item == null)
                {
                    _item = new ItemRepository(_context,_webHostEnvironment,_httpContextAccessor);
                }

                return _item;
            }
        }

        public ICategoryRepository Category
        {
            get
            {
                if(_category == null)
                {
                    _category = new CategoriesRepository(_context);
                }
                return _category;
            }
        }

        public ISaleRepository Sale
        {
            get
            {
                if (_sale == null)
                {
                    _sale = new SaleRepository(_context);
                }
                return _sale;
            }
        }

        public IStoreRepository Store
        {
            get
            {
                if(_store == null)
                {
                    _store = new StoreRepository(_context);
                }
                return _store;
            }
        }

        public IExpensesRepository Expenses
        {
            get
            {
                if (_expenses == null)
                {
                    _expenses = new ExpensesRepository(_context);
                }
                return _expenses;
            }
        }

        public IDamageRepository Damage
        {
            get
            {
                if(_damage == null)
                {
                    _damage = new DamageReportRepository(_context);
                }
                return _damage;
            }
        }

        public IDashBoardRepository Dashboard
        {
            get
            {
                if (_dashBoard == null)
                {
                    _dashBoard = new DashboardRepository(_context);
                }
                return _dashBoard;
            }
        }

    }
}
