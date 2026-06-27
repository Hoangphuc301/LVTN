using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Profile;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Profile.Queries.GetProfile
{
    public class GetProfileQueryHandler : IRequestHandler<GetProfileQuery,ProfileDto>
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public GetProfileQueryHandler(ICustomerRepository customerRepository, IMapper mapper )
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<ProfileDto> Handle(GetProfileQuery request, CancellationToken cancellationToken)
        {
            var khachHang = await _customerRepository.GetByMaTKAsync(request.MaTK);
            if (khachHang == null) throw new Exception("Không tìm thấy khách hàng");
            return _mapper.Map<ProfileDto>(khachHang);
        }
    }
}
