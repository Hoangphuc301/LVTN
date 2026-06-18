using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Application.DTOs.Voucher;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Vouchers.Queries.GetVoucherById
{
    public class GetVoucherByIdHandler : IRequestHandler<GetVoucherByIdQuery, VoucherDto>
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMapper _mapper;

        public GetVoucherByIdHandler(IVoucherRepository voucherRepository, IMapper mapper)
        {
            _voucherRepository = voucherRepository;
            _mapper = mapper;
        }

        public async Task<VoucherDto> Handle(GetVoucherByIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await _voucherRepository.GetByIdAsync(request.MaVoucher);
            return _mapper.Map<VoucherDto>(entity);
        }
    }
}
