using MediatR;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.DTOs.Order;
using sofm.Application.Features.Orders.Commands.CreateOrder;

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
    }
}
