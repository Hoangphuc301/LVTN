using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.DTOs.Color;
using sofm.Application.Features.Colors.Commands.CreateColor;
using sofm.Application.Features.Colors.Commands.DeleteColor;
using sofm.Application.Features.Colors.Commands.UpdateColor;
using sofm.Application.Features.Colors.Queries.GetAllColor;
using sofm.Application.Features.Colors.Queries.GetColorById;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ColorController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllColor()
        {
            var query = new GetAllColorQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateColor(CreateColorCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            var res = await _mediator.Send(new DeleteColorCommand { MaMau = id });
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateColor(int id, UpdateColorCommand command)
        {
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdColor(int id)
        {
            var res = await _mediator.Send(new GetColorByIdQuery { MaMau = id });
            return Ok(res);
        }
    }
}
