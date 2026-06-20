using MediatR;

namespace sofm.Application.Features.Orders.Commands.UpdateOrderStatus
{
    public class UpdateOrderStatusCommand : IRequest<bool>
    {
        public int MaDH { get; set; }
        public string TrangThai { get; set; } = "";
        public string? MoTa { get; set; }
    }
}
