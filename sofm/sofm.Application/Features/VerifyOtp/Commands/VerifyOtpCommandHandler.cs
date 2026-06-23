using MediatR;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.VerifyOtp.Commands
{
    public class VerifyOtpCommandHandler : IRequestHandler<VerifyOtpCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly ICustomerRepository _customerRepository;

        public VerifyOtpCommandHandler(IAccountRepository accountRepository, ICustomerRepository customerRepository)
        {
            _accountRepository = accountRepository;
            _customerRepository = customerRepository;
        }

        public async Task<bool> Handle(VerifyOtpCommand request, CancellationToken cancellationToken)
        {
            var account = await _accountRepository.GetByEmailAsync(request.Email);

            if (account == null) throw new Exception("Không tìm thấy tài khoản");

            if (account.OtpCode != request.OTP) throw new Exception("OTP không đúng");

            if (account.OtpExpired < DateTime.Now) throw new Exception("OTP đã hết hạn");

            account.EmailVerified = true;
            account.OtpCode = null;
            account.OtpExpired = null;

            await _accountRepository.SaveChangesAsync();
            return true;
        }
    }
}
