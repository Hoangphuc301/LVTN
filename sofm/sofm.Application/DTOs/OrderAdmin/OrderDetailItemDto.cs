namespace sofm.Application.DTOs.OrderAdmin
{
    public class OrderDetailItemDto
    {
        public int MaCTSP { get; set; }
        public string TenSP { get; set; } = "";
        public string Mau { get; set; } = "";
        public string Size { get; set; } = "";
        public int SoLuong { get; set; }
        public decimal DonGia { get; set; }
        public decimal ThanhTien { get; set; }
    }
}
