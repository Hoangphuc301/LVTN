using AutoMapper;
using MediatR;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Orders.Commands.UpdateOrderStatus
{
    public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public UpdateOrderStatusCommandHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        public async Task<bool> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
        {
            var order =
                await _orderRepository.GetOrderByIdAsync(
                    request.MaDH);

            if (order == null)
                throw new Exception(
                    "Không tìm thấy đơn hàng");

            order.TrangThai =
                request.TrangThai;

            await _orderRepository
                .UpdateOrderAsync(order);

            await _orderRepository
                .AddOrderHistoryAsync(
                    new LichSuDonHang
                    {
                        MaDh = order.MaDh,
                        TrangThai = request.TrangThai,
                        MoTa = request.MoTa ??
                               $"Cập nhật trạng thái thành {request.TrangThai}",
                        ThoiGian = DateTime.Now
                    });

            return true;
        }
    }
}
