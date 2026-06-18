using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.Vouchers.Commands.CreateVoucher;
using sofm.Application.Features.Vouchers.Commands.DeleteVoucher;
using sofm.Application.Features.Vouchers.Commands.UpdateVoucher;
using sofm.Application.Features.Vouchers.Queries.GetAllVoucher;
using sofm.Application.Features.Vouchers.Queries.GetVoucherById;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VoucherController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVoucher()
        {
            var query = new GetAllVoucherQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVoucher(CreateVoucherCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoucher(int id)
        {
            var res = await _mediator.Send(new DeleteVoucherCommand { MaVoucher = id });
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVoucher(int id, UpdateVoucherCommand command)
        {
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdVoucher(int id)
        {
            var res = await _mediator.Send(new GetVoucherByIdQuery { MaVoucher = id });
            return Ok(res);
        }
    }
}
