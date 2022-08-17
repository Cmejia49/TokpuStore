using AutoMapper;
using RetailPosApi.Dtos.V1.SaleDtos;
using RetailPosApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Profiles.CustomValueResolver
{
    public class SaleReportValueResolver : IValueResolver<Sale, SaleReportDto, string>
    {
        public string Resolve(Sale source, SaleReportDto destination, string destMember, ResolutionContext context)
        {
            throw new NotImplementedException();
        }
    }
}
