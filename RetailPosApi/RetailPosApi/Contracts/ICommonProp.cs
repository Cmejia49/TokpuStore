using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailPosApi.Contracts
{
    public interface ICommonProp
    {
        public int StoreFid { get; set; }
        public DateTime CreateDate { get; set; }
    }
}

