namespace sofm.Application.DTOs.Cart
{
    public class CartDto
    {
        public int MaGh { get; set; }
        public List<CartItemDto> Items { get; set; } = new();
        public decimal TongTien => Items.Sum(x => x.DonGia * x.SoLuong);
    }

    public class CartItemDto
    {
        public int MaCtsp { get; set; }
        public int MaSp { get; set; }
        public string TenSp { get; set; } = "";
        public string HinhAnh { get; set; } = "";
        public string Mau { get; set; } = "";
        public string Size { get; set; } = "";
        public decimal DonGia { get; set; }
        public int SoLuong { get; set; }
    }
}