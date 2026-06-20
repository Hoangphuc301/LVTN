using MediatR;
using sofm.Application.DTOs.OrderAdmin;

namespace sofm.Application.Features.Orders.Queries.GetOrderDetail
{
    public class GetOrderDetailQuery : IRequest<OrderDetailDto>
    {
        public int MaDH { get; set; }
        public GetOrderDetailQuery(int maDH)
        {
            MaDH = maDH;
        }
    }
}
