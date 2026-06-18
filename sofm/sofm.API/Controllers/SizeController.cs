using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.Sizes.Commands.CreateSize;
using sofm.Application.Features.Sizes.Commands.DeleteSize;
using sofm.Application.Features.Sizes.Commands.UpdateSize;
using sofm.Application.Features.Sizes.Queries.GetAllSize;
using sofm.Application.Features.Sizes.Queries.GetSizeById;


namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SizeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSize()
        {
            var query = new GetAllSizeQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSize(CreateSizeCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSize(int id)
        {
            var res = await _mediator.Send(new DeleteSizeCommand { MaSize = id });
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSize(int id, UpdateSizeCommand command)
        {
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdSize(int id)
        {
            var res = await _mediator.Send(new GetSizeByIdQuery { MaSize = id });
            return Ok(res);
        }
    }
}
