using AutoMapper;
using MediatR;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Register.Commands
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ICustomerRepository _customerRepository;

        public RegisterCommandHandler(IAccountRepository accountRepository, IEmailService emailService, IMapper mapper, IPasswordHasher passwordHasher, ICustomerRepository customerRepository)
        {
            _accountRepository = accountRepository;
            _emailService = emailService;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _customerRepository = customerRepository;
        }

        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var exists =
                await _accountRepository
                    .EmailExistsAsync(request.Email);

            if (exists)
                throw new Exception("Email đã tồn tại");

            var otp =
                new Random()
                    .Next(100000, 999999)
                    .ToString();

            var taiKhoan = new TaiKhoan
            {
                Email = request.Email,
                TenNguoiDung = request.TenKH,
                MatKhau = _passwordHasher.HashPassword(request.MatKhau),

                MaRole = 3,

                TrangThai = true,
                EmailVerified = false,

                OtpCode = otp,
                OtpExpired = DateTime.Now.AddMinutes(5)
            };

            await _accountRepository.AddAsync(taiKhoan);
            await _accountRepository.SaveChangesAsync();

            var khachHang = new KhachHang
            {
                TenKh = request.TenKH,
                Sdt = request.SDT,
                GioiTinh = request.GioiTinh,

                MaTk = taiKhoan.MaTk,
                NgayTao = DateTime.Now
            };

            await _customerRepository.AddAsync(khachHang);
            await _customerRepository.SaveChangesAsync();

            await _emailService.SendOtpAsync(
                request.Email,
                otp);

            return true;
        }
    }
}