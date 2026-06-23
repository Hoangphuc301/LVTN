using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.Login.Commands;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult>Login(LoginCommand command )
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
