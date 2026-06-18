using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.ProductVariant.Commands.CreateProductVariant;
using sofm.Application.Features.ProductVariant.Commands.UpdateProductVariant;
using sofm.Application.Features.ProductVariant.Queries.GetProductVariantsByProduct;
using sofm.Application.Features.ProductVariant.Queries.GetProductVariantById;
using sofm.Application.Features.ProductVariant.Commands.DeleteProductVariant;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductVariantController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductVariantController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("product/{maSp}")]
        public async Task<IActionResult> GetByProduct(int maSp)
        {
            return Ok(await _mediator.Send(new GetProductVariantsByProductQuery(maSp)));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductVariantCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPut("{maCtsp}")]
        public async Task<IActionResult> Update(int maCtsp, UpdateProductVariantCommand command)
        {
            if (maCtsp != command.MaCtsp) return BadRequest();

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("{maCtsp}")]
        public async Task<IActionResult> GetById(int maCtsp)
        {
            var result = await _mediator.Send(new GetProductVariantByIdQuery(maCtsp));
            return Ok(result);
        }

        [HttpDelete("{maCtsp}")]
        public async Task<IActionResult> Delete(int maCtsp)
        {
            await _mediator.Send(new DeleteProductVariantCommand(maCtsp));
            return NoContent();
        }
    }
}
