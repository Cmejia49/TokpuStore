using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace RetailPosApi.Model.V1.Parameter
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum FilterDay
    {
        [EnumMember(Value = "Today")]
        Today,

        [EnumMember(Value = "Yesterday")]
        Yesterday,

        [EnumMember(Value = "ThisWeek")]
        ThisWeek,

        [EnumMember(Value = "LastWeek")]
        LastWeek,

        [EnumMember(Value = "ThisMonth")]
        ThisMonth,

        [EnumMember(Value = "LastMonth")]
        LastMonth,

        [EnumMember(Value = "ThisYear")]
        ThisYear,

        [EnumMember(Value = "LastYear")]
        LastYear


    }
}
