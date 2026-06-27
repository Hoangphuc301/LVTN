using AutoMapper;
using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Profile.Commands.UpdateProfile
{
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, bool>
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public UpdateProfileCommandHandler(ICustomerRepository customerRepository, IMapper mapper, IAccountRepository accountRepository)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
            _accountRepository = accountRepository;
        }

        public async Task<bool> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            var khachHang = await _customerRepository.GetByMaTKAsync(request.MaTK);
            if (khachHang == null) throw new Exception("Không tìm thấy khách hàng");

            khachHang.TenKh = request.TenKH;
            khachHang.Sdt = request.SDT;
            khachHang.GioiTinh = request.GioiTinh;

            if (khachHang.MaTkNavigation != null)
            {
                khachHang.MaTkNavigation.TenNguoiDung = request.TenKH;
            }

            await _accountRepository.SaveChangesAsync();
            return true;
        }
    }
}
