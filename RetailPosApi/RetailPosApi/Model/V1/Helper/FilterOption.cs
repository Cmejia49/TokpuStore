using Microsoft.EntityFrameworkCore;
using RetailPosApi.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RetailPosApi.Model.V1.Helper
{
    public static class FilterOption 
    {
        public const string Today = "Today";
        public const string Yesterday = "Yesterday";
        public const string ThisWeek = "ThisWeek";
        public const string LastWeek = "LastWeek";
        public const string ThisMonth ="ThisMonth";
        public const string LastMonth = "LastMonth";
        public const string ThisYear = "ThisYear";
        public const string LastYear = "LastYear";

        public static IQueryable<T> Filter<T>(IQueryable<T> source, string filter) where T : class, ICommonProp
        {

            switch (filter)
            {
                case Today:
                    return source.Where(s => s.CreateDate.Date == DateTime.Today);

                case Yesterday:
                    return source.Where(s => s.CreateDate.Date >= DateTime.Today.AddDays(-1) &&
                            s.CreateDate.Date < DateTime.Today);

                case ThisWeek:
                    return source.Where(s => s.CreateDate.Date >= DateTime.Today.AddDays(-7));

                case LastWeek:
                    return source.Where(s => s.CreateDate.Date >= DateTime.Today.AddDays(-14) &&
                            s.CreateDate.Date <= DateTime.Today.AddDays(-7));

                case ThisMonth:
                    return source.Where(s => s.CreateDate.Date.Month == DateTime.Today.Month);

                case LastMonth:

                    return source.Where(s => s.CreateDate.Date >= DateTime.Today.AddMonths(-1) &&
                            s.CreateDate.Date.Month < DateTime.Today.Month);

                case ThisYear:
                    return source.Where(s => s.CreateDate.Date.Year >= DateTime.Today.Year);

                case LastYear:
                    return source.Where(s => s.CreateDate.Date >= DateTime.Today.AddYears(-1) &&
                            s.CreateDate.Date.Year < DateTime.Today.Year);

                default: 
                    return source.Where(x => x.CreateDate.Date == DateTime.Today.AddMonths(0));
            }
        }

        public static IQueryable<T> CheckId<T>(DbSet<T> db, int id) where T : class, ICommonProp
        {
            if(id != 0)
            {
                return db.Where(x => x.StoreFid == id).OrderBy(x => x.CreateDate); 
            }
            return db.OrderBy(x => x.CreateDate);
        }
    }
}
