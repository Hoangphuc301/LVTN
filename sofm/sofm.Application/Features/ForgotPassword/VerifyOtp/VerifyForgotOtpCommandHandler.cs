using AutoMapper;
using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ForgotPassword.VerifyOtp
{
    public class VerifyForgotOtpCommandHandler : IRequestHandler<VerifyForgotOtpCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public VerifyForgotOtpCommandHandler(IAccountRepository accountRepository, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<bool> Handle(VerifyForgotOtpCommand request, CancellationToken cancellationToken)
        {
            bool valid = await _accountRepository.VerifyOtpAsync(request.Email, request.OTP);
            if (!valid) throw new Exception("OTP không hợp lệ hoặc đã hết hạn");
            return true;
        }
    }
}
