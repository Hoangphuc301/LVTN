using AutoMapper;
using sofm.Application.DTOs.Address;
using sofm.Application.DTOs.Profile;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class ProfileProfile : Profile
    {
        public ProfileProfile() 
        {
            CreateMap<DiaChi, AddressDto>();

            CreateMap<KhachHang, ProfileDto>()
                .ForMember(
                    dest => dest.MaTK,
                    opt => opt.MapFrom(src => src.MaTk)
                )
                .ForMember(
                    dest => dest.TenKH,
                    opt => opt.MapFrom(src => src.TenKh)
                )
                .ForMember(
                    dest => dest.Email,
                    opt => opt.MapFrom(src => src.MaTkNavigation.Email)
                )
                .ForMember(
                    dest => dest.SDT,
                    opt => opt.MapFrom(src => src.Sdt)
                )
                .ForMember(
                    dest => dest.GioiTinh,
                    opt => opt.MapFrom(src => src.GioiTinh)
                )
                .ForMember(
                    dest => dest.DiaChis,
                    opt => opt.MapFrom(src => src.DiaChis)
                );
        }
    }
}
