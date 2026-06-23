using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.Register.Commands;
using sofm.Application.Features.VerifyOtp.Commands;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RegisterController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new
            {
                success = true,
                message = "OTP đã được gửi tới email",
                data = result
            });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp(VerifyOtpCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new
            {
                success = true,
                message = "OTP đã được gửi tới email",
                data = result
            });
        }
    }  
}
