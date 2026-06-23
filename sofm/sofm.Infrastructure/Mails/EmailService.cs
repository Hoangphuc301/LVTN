using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using sofm.Domain.Interfaces;

namespace sofm.Infrastructure.Mails
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(
            IConfiguration config)
        {
            _config = config;
        }

        public async Task SendOtpAsync(
            string email,
            string otp)
        {
            var message = new MimeMessage();

            message.From.Add(
                new MailboxAddress(
                    _config["EmailSmtp:FromName"],
                    _config["EmailSmtp:FromEmail"]
                )
            );

            message.To.Add(
                MailboxAddress.Parse(email)
            );

            message.Subject =
                "Mã xác thực SOFM";

            message.Body =
                new TextPart("html")
                {
                    Text =
                    $"""
                    <h2>Xác thực tài khoản SOFM</h2>
                    <p>Mã OTP của bạn là:</p>
                    <h1>{otp}</h1>
                    <p>OTP có hiệu lực trong 5 phút.</p>
                    """
                };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                _config["EmailSmtp:Host"],
                int.Parse(_config["EmailSmtp:Port"]),
                SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(
                _config["EmailSmtp:Username"],
                _config["EmailSmtp:Password"]
            );

            await smtp.SendAsync(message);

            await smtp.DisconnectAsync(true);
        }
    }
}
