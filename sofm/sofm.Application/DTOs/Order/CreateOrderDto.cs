namespace sofm.Application.DTOs.Order
{
    public class CreateOrderDto
    {
        public int MaKH { get; set; }
        public int MaPTTT { get; set; }
        public string SDTGiao { get; set; }
        public string DiaChiGiao { get; set; }
        public List<CreateOrderItemDto> Items
        {
            get;
            set;
        } = [];
    }
}
