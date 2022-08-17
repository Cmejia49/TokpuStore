using AutoMapper;
using RetailPosApi.Dtos.ExpensesDtos;
using RetailPosApi.Dtos.V1.ReportSummaryDtos;
using RetailPosApi.Model.V1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Profiles.V1
{
    public class ReportSummaryProfile:Profile
    {
        public ReportSummaryProfile()
        {
            CreateMap<ReportSummary, ReadExpensesReportDto>();
            CreateMap<ReportSummary, ReadDamageReportDto>();
            CreateMap<ReportSummary, ReadSaleReportDto>();
            CreateMap<ReportSummary, ReadGeneralReportDto>();
        }

    }
}
