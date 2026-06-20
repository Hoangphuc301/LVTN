namespace sofm.Application.DTOs.OrderAdmin
{
    public class UpdateOrderStatusDto
    {
        public int MaDH { get; set; }
        public string TrangThai { get; set; } = "";
        public string? MoTa { get; set; }
    }
}
