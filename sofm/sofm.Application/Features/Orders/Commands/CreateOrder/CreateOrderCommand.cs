using MediatR;
using sofm.Application.DTOs.Order;

namespace sofm.Application.Features.Orders.Commands.CreateOrder
{
    public class CreateOrderCommand
         : IRequest<CreateOrderResponseDto>
    {
        public CreateOrderDto Order { get; set; }

        public CreateOrderCommand(
            CreateOrderDto order
        )
        {
            Order = order;
        }
    }
}
