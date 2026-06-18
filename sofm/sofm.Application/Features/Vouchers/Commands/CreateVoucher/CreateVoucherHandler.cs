using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Voucher;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Vouchers.Commands.CreateVoucher
{
    public class CreateVoucherHandler : IRequestHandler<CreateVoucherCommand, VoucherDto>  
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMapper _mapper;

        public CreateVoucherHandler(IVoucherRepository voucherRepository, IMapper mapper)
        {
            _voucherRepository = voucherRepository;
            _mapper = mapper;
        }

        public async Task<VoucherDto> Handle(CreateVoucherCommand request, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<Voucher>(request);
            var createdEntity = await _voucherRepository.CreateAsync(entity);
            return _mapper.Map<VoucherDto>(createdEntity);
        }
    }
}
