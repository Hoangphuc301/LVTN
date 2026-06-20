using AutoMapper;
using MediatR;
using sofm.Application.DTOs.OrderAdmin;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Orders.Queries.GetOrderDetail
{
    public class GetOrderDetailQueryHandler : IRequestHandler<GetOrderDetailQuery, OrderDetailDto>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public GetOrderDetailQueryHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<OrderDetailDto> Handle(GetOrderDetailQuery request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetOrderDetailAsync(request.MaDH);
            return _mapper.Map<OrderDetailDto>(order);
        }
    }
}
