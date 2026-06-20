using MediatR;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.DTOs.Order;
using sofm.Application.Features.Orders.Commands.CreateOrder;
using sofm.Application.Features.Orders.Commands.UpdateOrderStatus;
using sofm.Application.Features.Orders.Queries.GetAllOrder;
using sofm.Application.Features.Orders.Queries.GetOrderDetail;
using sofm.Application.Features.Orders.Queries.GetOrderHistory;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto dto)
        {
            var result = await _mediator.Send(new CreateOrderCommand( dto));
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var result = await _mediator.Send(new GetAllOrderQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var result = await _mediator.Send(new GetOrderDetailQuery(id));
            return Ok(result);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateOrderStatusCommand command)
        {
            command.MaDH = id;
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("{id}/history")]
        public async Task<IActionResult> GetHistory(int id)
        {
            var result = await _mediator.Send(new GetOrderHistoryQuery(id));
            return Ok(result);
        }
    }
}
