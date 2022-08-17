using RetailPosApi.Contracts;
using System;
using System.ComponentModel.DataAnnotations;

namespace RetailPosApi.Model
{
    public class Expenses:ICommonProp
    {
        [Key]
        public int ExpensesId { get; set; }
        public int Value { get; set; }
        public string Detail { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreateDate { get; set; }
        public int StoreFid { get; set; }
        public Store store { get; set; }
    }
}
