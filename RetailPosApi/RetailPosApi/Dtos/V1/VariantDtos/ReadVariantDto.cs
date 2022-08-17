using RetailPosApi.Dtos.V1.OptionDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.VariantDtos
{
    public class ReadVariantDto
    {
        public int VarietyId { get; set; }
        public string VarietyName { get; set; }
        public IReadOnlyCollection<ReadOptionDto> Options { get; set; }
    }
}
