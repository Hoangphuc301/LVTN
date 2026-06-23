using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.ForgotPassword.ResetPassword;
using sofm.Application.Features.ForgotPassword.SendOtp;
using sofm.Application.Features.ForgotPassword.VerifyOtp;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ForgotPasswordController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp(ForgotPasswordCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp(VerifyForgotOtpCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
