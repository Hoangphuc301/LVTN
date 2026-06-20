namespace sofm.Application.DTOs.OrderAdmin
{
    public class OrderListDto
    {
        public int MaDH { get; set; }
        public string TenKhach { get; set; } = "";
        public string Sdt { get; set; } = "";
        public decimal TongTienCuoi { get; set; }
        public string TrangThai { get; set; } = "";
        public DateTime NgayDat { get; set; }
    }
}