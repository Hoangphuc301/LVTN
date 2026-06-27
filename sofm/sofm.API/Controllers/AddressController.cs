using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.Address.Commands.AddAddress;
using sofm.Application.Features.Address.Commands.DeleteAddress;
using sofm.Application.Features.Address.Commands.SetDefaultAddress;
using sofm.Application.Features.Address.Commands.UpdateAddress;
using sofm.Application.Features.Address.Queries.GetAddresses;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AddressController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{maKH}")]
        public async Task<IActionResult> GetAddresses(int maKH)
        {
            var result = await _mediator.Send(new GetAddressesQuery { MaKH = maKH });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddAddress(AddAddressCommand command)
        {
            await _mediator.Send(command);
            return Ok("Thêm địa chỉ thành công");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAddress(UpdateAddressCommand command)
        {
            await _mediator.Send(command);
            return Ok("Cập nhật địa chỉ thành công");
        }

        [HttpDelete("{maDiaChi}")]
        public async Task<IActionResult> DeleteAddress(int maDiaChi)
        {
            await _mediator.Send(new DeleteAddressCommand { MaDiaChi = maDiaChi });
            return Ok("Xóa địa chỉ thành công");
        }

        [HttpPut("default")]
        public async Task<IActionResult> SetDefault(SetDefaultAddressCommand command)
        {
            await _mediator.Send(command);
            return Ok("Đặt địa chỉ mặc định thành công");
        }
    }
}
