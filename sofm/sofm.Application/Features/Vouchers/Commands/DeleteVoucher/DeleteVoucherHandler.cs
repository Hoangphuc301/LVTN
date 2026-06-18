using AutoMapper;
using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Vouchers.Commands.DeleteVoucher
{
    public class DeleteVoucherHandler : IRequestHandler<DeleteVoucherCommand, int>
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMapper _mapper;

        public DeleteVoucherHandler(IVoucherRepository voucherRepository, IMapper mapper)
        {
            _voucherRepository = voucherRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(DeleteVoucherCommand request, CancellationToken cancellationToken)
        {
            var kq = await _voucherRepository.DeleteAsync(request.MaVoucher);
            return kq;
        }
    }
}
