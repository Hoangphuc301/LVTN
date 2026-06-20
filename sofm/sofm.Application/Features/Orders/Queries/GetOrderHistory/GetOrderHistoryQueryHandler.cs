using AutoMapper;
using MediatR;
using sofm.Application.DTOs.OrderAdmin;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Orders.Queries.GetOrderHistory
{
    public class GetOrderHistoryQueryHandler : IRequestHandler<GetOrderHistoryQuery, List<OrderHistoryDto>>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public GetOrderHistoryQueryHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<List<OrderHistoryDto>> Handle(GetOrderHistoryQuery request, CancellationToken cancellationToken)
        {
            var history = await _orderRepository.GetOrderHistoryAsync(request.MaDH);
            return _mapper.Map<List<OrderHistoryDto>>(history);
        }
    }
}
