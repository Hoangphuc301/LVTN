using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Size;
using sofm.Application.DTOs.Voucher;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Vouchers.Queries.GetAllVoucher
{
    public class GetAllVoucherHandler : IRequestHandler<GetAllVoucherQuery, List<VoucherDto>>   
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMapper _mapper;

        public GetAllVoucherHandler(IVoucherRepository voucherRepository, IMapper mapper)
        {
            _voucherRepository = voucherRepository;
            _mapper = mapper;
        }

        public async Task<List<VoucherDto>> Handle(GetAllVoucherQuery request, CancellationToken cancellationToken)
        {
            var entities = await _voucherRepository.GetAllAsync();
            return _mapper.Map<List<VoucherDto>>(entities);
        }
    }
}
