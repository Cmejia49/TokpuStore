using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using RetailPosApi.DataAccess;
using RetailPosApi.Model;
using RetailPosApi.Model.Helper;
using RetailPosApi.Model.V1;
using RetailPosApi.Model.V1.Helper;
using RetailPosApi.Model.V1.Parameter;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Service
{
    public class DashboardRepository : IDashBoardRepository
    {
        private readonly ItemContext _context;
        private readonly DateTime date = new DateTime(DateTime.Today.Year, 01, 01);
        private readonly DateTime Ldate = new DateTime(DateTime.Today.AddYears(-1).Year, 01, 01);
        public DashboardRepository(ItemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReportSummary>> DamageSummary(int id,string option)
        {


            var damage = FilterOption.CheckId(_context.Damages, id);
            if (option.Equals(FilterOption.ThisYear))
            {
                return await FilterOption.Filter(damage, option).Select(x => new
                {
                    x.ItemPrice,
                    x.Quantity,
                    x.CreateDate
                }).GroupBy(o => EF.Functions.DateDiffMonth(date, o.CreateDate))
              .Select(a => new ReportSummary
              {
                  Date = new DateTime(date.Year, a.Key + 1, 1).ToString("MMMM", CultureInfo.InvariantCulture),
                  TotalCost = a.Sum(s => s.ItemPrice * s.Quantity),
                  TotalQuantity = a.Sum(x => x.Quantity),
                      NumOfTransac = a.Count()

              }).ToListAsync();
            }else if (option.Equals(FilterOption.LastYear))
            {
                return await FilterOption.Filter(damage, option).Select(x => new
                {
                    x.ItemPrice,
                    x.Quantity,
                    x.CreateDate
                }).GroupBy(o => EF.Functions.DateDiffMonth(Ldate, o.CreateDate))
            .Select(a => new ReportSummary
            {
                Date = new DateTime(Ldate.Year, a.Key + 1, 1).ToString("MMMM", CultureInfo.InvariantCulture),
                TotalCost = a.Sum(s => s.ItemPrice * s.Quantity),
                TotalQuantity = a.Sum(x => x.Quantity),
                NumOfTransac = a.Count()

            }).ToListAsync();
            }
            else
            {
                return await FilterOption.Filter(damage, option).Select(x => new
                {
                    x.ItemPrice,
                    x.Quantity,
                    x.CreateDate
                }).GroupBy(s => s.CreateDate)
          .Select(a => new ReportSummary
          {

              Date = a.Key.ToString("dd/MM/yyyy"),
              TotalCost = a.Sum(s => s.ItemPrice * s.Quantity),
              TotalQuantity = a.Sum(x => x.Quantity),
              NumOfTransac = a.Count()

          }).ToListAsync();
            }

        }
        private static int Converter(string itemcode)
        {
            char[] code = {'S', 'D', 'A', 'N', 'T', 'E', 'M', 'O', 'J', 'I'};
            var search = itemcode.ToCharArray();
            string converted="";
            for (int i = 0; i < search.Length; i++)
            {
                for (int j = 0; j < code.Length; j++)
                {
                    if(search[i] == code[j])
                    {
                        converted += j.ToString();
                    }
                }
            }
            return Int32.Parse(converted);
        }

        public async Task<IEnumerable<ReportSummary>> ExpensesSummary(int id, string option)
        {
            var expenses = FilterOption.CheckId(_context.Expenses, id);
            if (option.Equals(FilterOption.ThisYear))
            {
                return await FilterOption.Filter(expenses, option)
               .GroupBy(o => EF.Functions.DateDiffMonth(date, o.CreateDate))
                .Select(s => new ReportSummary
                {
                    Date = new DateTime(DateTime.Now.Year, s.Key + 1, 1).ToString("MMMM", CultureInfo.InvariantCulture),
                    TotalExpenses = s.Sum(y => y.Value),
                    NumOfTransac = s.Count()

                }).ToListAsync();
            }else if (option.Equals(FilterOption.LastYear))
            {
                return await FilterOption.Filter(expenses, option)
                           .GroupBy(o => EF.Functions.DateDiffMonth(Ldate, o.CreateDate))
                            .Select(s => new ReportSummary
                            {
                                Date = new DateTime(Ldate.Year, s.Key + 1, 1).ToString("MMMM", CultureInfo.InvariantCulture),
                                TotalExpenses = s.Sum(y => y.Value),
                                NumOfTransac = s.Count()

                            }).ToListAsync();
            }
            else
            {
                return await FilterOption.Filter(expenses, option)
          .GroupBy(o => o.CreateDate)
           .Select(s => new ReportSummary
           {

               Date = s.Key.ToString("dd/MM/yyyy"),
               TotalExpenses = s.Sum(y => y.Value),
               NumOfTransac = s.Count()
           }).ToListAsync();
            }

        }


        public async Task<IEnumerable<ReportSummary>> SaleSummary(int id,string option)
        {
            var sale = FilterOption.CheckId(_context.Sales, id);
            if (option.Equals(FilterOption.ThisYear) || option.Equals(FilterOption.LastYear))
            {
                return await FilterOption.Filter(sale, option)
                           .GroupBy(o => EF.Functions.DateDiffMonth(date, o.CreateDate))
                            .Select(x => new ReportSummary
                            {
                                Date = new DateTime(date.Year, x.Key + 1, 1).ToString("MMMM", CultureInfo.InvariantCulture),
                                TotalRevenue = (x.Sum(y => y.Price * y.Quantity)),
                                TotalQuantity = x.Sum(y => y.Quantity),
                                NumOfTransac = x.Count()
                                
                            }).ToListAsync();
            }else if (option.Equals(FilterOption.LastYear))
            {
                return await FilterOption.Filter(sale, option)
                        .GroupBy(o => EF.Functions.DateDiffMonth(Ldate, o.CreateDate))
                         .Select(x => new ReportSummary
                         {
                             Date = new DateTime(Ldate.Year, x.Key + 1, 1).ToString("MMMM", CultureInfo.InvariantCulture),
                             TotalRevenue = (x.Sum(y => y.Price * y.Quantity)),
                             TotalQuantity = x.Sum(y => y.Quantity),
                             NumOfTransac = x.Count()

                         }).ToListAsync();
            }
            else
            {

                return await FilterOption.Filter(sale, option)
                     .GroupBy(x => x.CreateDate)
                               .Select(x => new ReportSummary
                               {
                                   Date = x.Key.ToString("dd/MM/yyyy"),
                                   TotalRevenue = (x.Sum(y => y.Price * y.Quantity)),
                                   TotalQuantity = x.Sum(y => y.Quantity),
                                   NumOfTransac = x.Count()

                               }).ToListAsync();
            }

        }

        public async Task<ReportSummary> GetSummary(int id,string option)
        {
            var saleTotal = await FilterOption.Filter(FilterOption.CheckId(_context.Sales, id), option).SumAsync(x => x.Price * x.Quantity);
            var sale = await FilterOption.Filter(FilterOption.CheckId(_context.Sales, id), option).Select(x => new { V = Converter(x.ItemCode) }).ToListAsync();
            var itemCost = sale.Sum(x => x.V);
            var damageTotal =await FilterOption.Filter(FilterOption.CheckId(_context.Damages, id), option).SumAsync(x => x.ItemPrice);
            var expensesTotal =await FilterOption.Filter(FilterOption.CheckId(_context.Expenses, id), option).SumAsync(x => x.Value);
            var transac = await FilterOption.Filter(FilterOption.CheckId(_context.Sales, id), option).CountAsync();
            ReportSummary report = new ReportSummary
            {
                TotalCost = itemCost,
                TotalExpenses = expensesTotal,
                TotalSale = saleTotal, //revenue
                TotalDamage = damageTotal,
                TotalProfit = saleTotal - itemCost,
                NetIncome = (saleTotal - expensesTotal)-itemCost,
                NumOfTransac = transac
            };
            return report;
              
        }
    }

}
