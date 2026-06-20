using AutoMapper;
using MediatR;
using sofm.Application.DTOs.OrderAdmin;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Orders.Queries.GetAllOrder
{
    public class GetAllOrderQueryHandler : IRequestHandler<GetAllOrderQuery, List<OrderListDto>>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public GetAllOrderQueryHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<List<OrderListDto>> Handle(GetAllOrderQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOrdersAsync();
            return _mapper.Map<List<OrderListDto>>(orders);
        }
    }
}
