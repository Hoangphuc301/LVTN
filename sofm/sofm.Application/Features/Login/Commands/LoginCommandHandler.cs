using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Login;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Login.Commands
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginDto>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;

        public LoginCommandHandler(IAccountRepository accountRepository, IPasswordHasher passwordHasher, IJwtService jwtService, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        public async Task<LoginDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var account =
                await _accountRepository.LoginAsync(request.Email);

            if (account == null)
                throw new Exception("Email không tồn tại");

            if (!account.EmailVerified.GetValueOrDefault())
                throw new Exception("Tài khoản chưa xác thực OTP");

            var valid =
                _passwordHasher.VerifyPassword(
                    request.MatKhau,
                    account.MatKhau);

            if (!valid)
                throw new Exception("Sai mật khẩu");

            var result =
                _mapper.Map<LoginDto>(account);

            result.Token =
                _jwtService.GenerateToken(
                    account.MaTk,
                    account.Email,
                    account.MaRoleNavigation.TenRole,
                    account.TenNguoiDung);

            return result;
        }
    
    }
}
