using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.DTOs.Product;
using sofm.Application.Features.Products.Commands.Create;
using sofm.Application.Features.Products.Commands.DeleteProduct;
using sofm.Application.Features.Products.Commands.UpdateProduct;
using sofm.Application.Features.Products.Queries.GetAllProduct;
using sofm.Application.Features.Products.Queries.GetProductById;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProduct()
        {
            var query = new GetAllProductQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create(CreateProductCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var res = await _mediator.Send(new DeleteProductCommand { MaSp = id });
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateProductCommand command)
        {
            //command.MaSp = id;
            //var res = await _mediator.Send(command);
            //return Ok(res);
            try
            {
                if (id != command.MaSp)
                    return BadRequest("Id không khớp");

                var result = await _mediator.Send(command);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var res = await _mediator.Send(new GetProductByIdQuery { MaSp = id });
            return Ok(res);
        }
    }
}
