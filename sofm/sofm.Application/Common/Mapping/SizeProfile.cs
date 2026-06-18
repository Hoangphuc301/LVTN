using sofm.Application.DTOs.Size;
using sofm.Application.Features.Sizes.Commands.CreateSize;
using sofm.Application.Features.Sizes.Commands.DeleteSize;
using sofm.Application.Features.Sizes.Commands.UpdateSize;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class SizeProfile : BaseMappingProfile<Size, CreateSizeCommand, UpdateSizeCommand, DeleteSizeCommand, SizeDto>
    {
        public SizeProfile() : base()
        {
            CreateMap<Size, SizeDto>()
            .ForMember(dest => dest.MaDM,
                opt => opt.MapFrom(src => src.MaDm))

            .ForMember(dest => dest.TenDM,
                opt => opt.MapFrom(src => src.MaDmNavigation.TenDm))

            .ForMember(dest => dest.MoTa,
                opt => opt.MapFrom(src => src.MoTa))

            .ForMember(dest => dest.TrangThai,
                opt => opt.MapFrom(src => src.TrangThai ?? false));
        }
    }
}
