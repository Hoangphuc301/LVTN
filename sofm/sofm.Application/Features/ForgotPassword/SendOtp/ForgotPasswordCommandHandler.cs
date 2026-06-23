using AutoMapper;
using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ForgotPassword.SendOtp
{
    public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public ForgotPasswordCommandHandler(IAccountRepository accountRepository, IMapper mapper, IEmailService emailService)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<bool> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
        {
            var account = await _accountRepository.GetByEmailAsync(request.Email);
            if (account == null) throw new Exception("Email không tồn tại");

            var otp = new Random()
                    .Next(100000, 999999)
                    .ToString();

            await _accountRepository.UpdateOtpAsync(request.Email, otp, DateTime.Now.AddMinutes(5));
            await _accountRepository.SaveChangesAsync();
            await _emailService.SendOtpAsync(request.Email,otp);

            return true;
        }
    }
}
