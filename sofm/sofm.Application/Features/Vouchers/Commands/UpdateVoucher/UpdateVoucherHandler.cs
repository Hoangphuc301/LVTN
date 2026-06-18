using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Voucher;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Vouchers.Commands.UpdateVoucher
{
    public class UpdateVoucherHandler : IRequestHandler<UpdateVoucherCommand, VoucherDto>
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMapper _mapper;

        public UpdateVoucherHandler(IVoucherRepository voucherRepository, IMapper mapper)
        {
            _voucherRepository = voucherRepository;
            _mapper = mapper;
        }

        public async Task<VoucherDto> Handle(UpdateVoucherCommand request, CancellationToken cancellationToken)
        {
            var entity = await _voucherRepository.GetByIdAsync(request.MaVoucher);

            if (entity == null) throw new Exception("Không tìm thấy mã giảm giá");

            _mapper.Map(request, entity);

            var updatedEntity = await _voucherRepository.UpdateAsync(request.MaVoucher, entity);

            return _mapper.Map<VoucherDto>(updatedEntity);
        }
    }
}
