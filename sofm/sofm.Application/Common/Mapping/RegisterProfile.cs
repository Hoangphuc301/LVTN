using AutoMapper;
using sofm.Application.Features.Register.Commands;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class RegisterProfile : Profile
    {
        public RegisterProfile()
        {
            CreateMap<RegisterCommand,TaiKhoan>();
        }
    }
}
