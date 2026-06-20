using MediatR;
using sofm.Application.DTOs.OrderAdmin;

namespace sofm.Application.Features.Orders.Queries.GetAllOrder
{
    public class GetAllOrderQuery : IRequest<List<OrderListDto>>
    {
    }
}
