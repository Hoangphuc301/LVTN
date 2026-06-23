using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using sofm.Domain.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class JwtServiceRepository : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtServiceRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(
            int maTK,
            string email,
            string role,
            string tenNguoiDung
        )
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    maTK.ToString()
                ),

                new Claim(
                    ClaimTypes.Email,
                    email
                ),

                new Claim(
                    ClaimTypes.Role,
                    role
                ),

                new Claim(
                    ClaimTypes.Name,
                    tenNguoiDung
                )
            };

            var token =
                new JwtSecurityToken(
                    issuer:
                        _configuration["Jwt:Issuer"],

                    audience:
                        _configuration["Jwt:Audience"],

                    claims: claims,

                    expires:
                        DateTime.Now.AddMinutes(
                            Convert.ToDouble(
                                _configuration[
                                    "Jwt:ExpireMinutes"
                                ]
                            )
                        ),

                    signingCredentials:
                        credentials
                );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}
