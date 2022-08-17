namespace RetailPosApi.Model
{
    public class ItemParameter : QueryStringParameters
    {
        public int CatId { get; set; }
        public string ItemName { get; set; }
    }
}
