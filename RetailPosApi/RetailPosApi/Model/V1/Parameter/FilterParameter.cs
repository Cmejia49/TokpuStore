using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace RetailPosApi.Model.V1.Parameter
{
    public class FilterParameter:QueryStringParameters
    {
        public DateTime DateTime { get; set; }
        public FilterDay Day { get; set; }
        public int id { get; set; }
    }
}