using sofm.Application.DTOs.Color;
using sofm.Application.Features.Colors.Commands.CreateColor;
using sofm.Application.Features.Colors.Commands.DeleteColor;
using sofm.Application.Features.Colors.Commands.UpdateColor;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class ColorProfile : BaseMappingProfile<Mau, CreateColorCommand,UpdateColorCommand,DeleteColorCommand,ColorDto>
    {
        public ColorProfile() : base()
        {

        }
    }
}
