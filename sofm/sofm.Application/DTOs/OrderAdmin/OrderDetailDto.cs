namespace sofm.Application.DTOs.OrderAdmin
{
    public class OrderDetailDto
    {
        public int MaDH { get; set; }
        public string TenKhach { get; set; } = "";
        public string Sdt { get; set; } = "";
        public string DiaChi { get; set; } = "";
        public decimal TongTien { get; set; }
        public decimal PhiShip { get; set; }
        public decimal TongTienCuoi { get; set; }
        public string TrangThai { get; set; } = "";
        public DateTime NgayDat { get; set; }
        public List<OrderDetailItemDto> Items { get; set; } = [];
    }
}
