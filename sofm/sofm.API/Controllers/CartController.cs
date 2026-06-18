using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.Cart.Commands.AddToCart;
using sofm.Application.Features.Cart.Commands.ClearCart;
using sofm.Application.Features.Cart.Commands.RemoveCart;
using sofm.Application.Features.Cart.Commands.UpdateCart;
using sofm.Application.Features.Cart.Queries.GetCart;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{maKh}")]
        public async Task<IActionResult> GetCart(int maKh)
        {
            return Ok(await _mediator.Send(new GetCartQuery(maKh)));
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(AddToCartCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQuantity(UpdateCartQuantityCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete("{maKh}/{maCtsp}")]
        public async Task<IActionResult> RemoveItem(int maKh, int maCtsp)
        {
            await _mediator.Send(new RemoveCartItemCommand(maKh, maCtsp));
            return Ok();
        }

        [HttpDelete("{maKh}")]
        public async Task<IActionResult> ClearCart(int maKh)
        {
            await _mediator.Send(new ClearCartCommand(maKh));
            return Ok();
        }
    }
}
