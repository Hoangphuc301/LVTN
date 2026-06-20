using MediatR;
using sofm.Application.DTOs.OrderAdmin;

namespace sofm.Application.Features.Orders.Queries.GetOrderHistory
{
    public class GetOrderHistoryQuery : IRequest<List<OrderHistoryDto>>
    {
        public int MaDH { get; set; }

        public GetOrderHistoryQuery(int maDH)
        {
            MaDH = maDH;
        }
    }
}
