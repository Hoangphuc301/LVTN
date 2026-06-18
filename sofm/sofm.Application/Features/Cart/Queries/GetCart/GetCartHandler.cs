using MediatR;
using sofm.Application.DTOs.Cart;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Cart.Queries.GetCart
{
    public class GetCartHandler : IRequestHandler<GetCartQuery, CartDto>
    {
        private readonly ICartRepository _cartRepository;
        public GetCartHandler(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }
        public async Task<CartDto> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            var cart = await _cartRepository.GetCartByCustomerAsync(request.MaKh);
            if (cart == null)
            {
                return new CartDto();
            }

            return new CartDto
            {
                MaGh = cart.MaGh,

                Items = cart.ChiTietGioHangs.Select(x => new CartItemDto
                {
                    MaCtsp = x.MaCtsp,

                    MaSp = x.MaCtspNavigation.MaSp,

                    TenSp = x.MaCtspNavigation.MaSpNavigation.TenSp,

                    HinhAnh = x.MaCtspNavigation.MaSpNavigation.HinhSanPhams.FirstOrDefault()?.DuongDan ?? "",

                    Mau = x.MaCtspNavigation.MaMauNavigation.TenMau,

                    Size = x.MaCtspNavigation.MaSizeNavigation.TenSize,

                    DonGia = x.MaCtspNavigation.MaSpNavigation.GiaGiam ?? x.MaCtspNavigation.MaSpNavigation.Gia,

                    SoLuong = x.SoLuong
                }).ToList()
            };
        }
    }
}
