namespace sofm.Application.DTOs.Order
{
    public class CreateOrderResponseDto
    {
        public int MaDH { get; set; }
        public decimal TongTien { get; set; }
        public decimal PhiShip { get; set; }
        public decimal TongTienCuoi { get; set; }
        public string TrangThai { get; set; }
    }
}
