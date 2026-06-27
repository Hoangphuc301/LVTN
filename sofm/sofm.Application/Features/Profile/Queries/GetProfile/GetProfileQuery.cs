using MediatR;
using sofm.Application.DTOs.Profile;

namespace sofm.Application.Features.Profile.Queries.GetProfile
{
    public class GetProfileQuery : IRequest<ProfileDto>
    {
        public int MaTK { get; set; }
    }
}
