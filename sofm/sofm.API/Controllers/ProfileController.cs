using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.Features.Profile.Commands.UpdateProfile;
using sofm.Application.Features.Profile.Queries.GetProfile;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{maTK}")]
        public async Task<IActionResult>GetProfile(int maTK)
        {
            var result = await _mediator.Send(
                    new GetProfileQuery
                    {
                        MaTK = maTK
                    });

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult>UpdateProfile(UpdateProfileCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
