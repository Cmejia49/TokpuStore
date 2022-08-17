using RetailPosApi.Dtos.V1.OptionDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Dtos.V1.VariantDtos
{
    public class CreateVariantDto
    {
        public string VarietyName { get; set; }
        public List<CreateOptionDto> Options { get; set; }
    }
}
