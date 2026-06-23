using AutoMapper;
using sofm.Application.DTOs.Login;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class LoginProfile : Profile
    {
        public LoginProfile()
        {
            CreateMap<TaiKhoan, LoginDto>()
                .ForMember(
                    dest => dest.MaTK,
                    opt => opt.MapFrom(src => src.MaTk))
                .ForMember(
                    dest => dest.TenNguoiDung,
                    opt => opt.MapFrom(src => src.TenNguoiDung))
                .ForMember(
                    dest => dest.Role,
                    opt => opt.MapFrom(src => src.MaRoleNavigation.TenRole));
        }
    }
}
