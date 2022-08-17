using System;

namespace RetailPosApi.Dtos.ExpensesDtos
{
    public class ReadExpensesDto
    {
        public int ExpensesId { get; set; }
        public string StoreName { get; set; }
        public int Value { get; set; }
        public string Detail { get; set; }
        public string CreateDate { get; set; }

    }
}
