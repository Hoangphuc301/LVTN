using AutoMapper;
using sofm.Application.DTOs.Address;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class AddressProfile : Profile
    {
        public AddressProfile()
        {
            CreateMap<DiaChi, AddressDto>();
        }
    }
}
