using AutoMapper;
using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ForgotPassword.ResetPassword
{
    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;

        public ResetPasswordCommandHandler(IAccountRepository accountRepository, IMapper mapper, IPasswordHasher passwordHasher)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            bool valid = await _accountRepository.VerifyOtpAsync(request.Email, request.OTP);

            if (!valid) throw new Exception("OTP không hợp lệ hoặc đã hết hạn");

            string hashPassword = _passwordHasher.HashPassword(request.NewPassword);
            await _accountRepository.UpdatePasswordAsync(request.Email, hashPassword);
            await _accountRepository.SaveChangesAsync();

            return true;
        }
    }
}
