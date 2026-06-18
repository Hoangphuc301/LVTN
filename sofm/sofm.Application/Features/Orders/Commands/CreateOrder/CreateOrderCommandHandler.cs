using MediatR;
using sofm.Application.DTOs.Order;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, CreateOrderResponseDto>
    {
        private readonly IOrderRepository _orderRepository;

        public CreateOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<CreateOrderResponseDto> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Order;

            foreach (var item in dto.Items)
            {
                var product = await _orderRepository.GetProductAsync(item.MaCTSP);

                if (product == null)
                    throw new Exception($"Không tìm thấy sản phẩm có mã {item.MaCTSP}");

                if ((product.Slton ?? 0) < item.SoLuong) throw new Exception($"Chỉ còn {(product.Slton ?? 0)} sản phẩm");
            }

            decimal tongTien = dto.Items.Sum(x => x.DonGia * x.SoLuong);
            decimal phiShip = tongTien > 0 ? 30000 : 0;
            decimal tongTienCuoi = tongTien + phiShip;

            var donHang = new DonHang
            {
                MaKh = dto.MaKH,
                MaPttt = dto.MaPTTT,
                TongTien = tongTien,
                Sdtgiao = dto.SDTGiao,
                DiaChiGiao = dto.DiaChiGiao,
                PhiShip = phiShip,
                TongTienCuoi = tongTienCuoi,
                TrangThai = "Chờ xác nhận",
                NgayDat = DateTime.Now
            };

            var chiTiets = dto.Items.Select(x => new ChiTietDonHang
            {
                MaCtsp = x.MaCTSP,
                Sl = x.SoLuong,
                DonGia = x.DonGia,
                ThanhTien = x.DonGia * x.SoLuong
            }).ToList();

            var lichSu = new LichSuDonHang
            {
                TrangThai = "Chờ xác nhận",
                MoTa = "Đơn hàng được tạo",
                ThoiGian = DateTime.Now
            };

            var result = await _orderRepository.CreateOrderAsync(donHang, chiTiets, lichSu);

            foreach (var item in dto.Items)
            {
                var product = await _orderRepository.GetProductAsync(item.MaCTSP);

                if (product != null)
                    product.Slton -= item.SoLuong;
            }

            await _orderRepository.SaveChangesAsync();

            return new CreateOrderResponseDto
            {
                MaDH = result.MaDh,
                TongTien = result.TongTien,
                PhiShip = result.PhiShip ?? 0,
                TongTienCuoi = result.TongTienCuoi ?? 0,
                TrangThai = result.TrangThai ?? string.Empty
            };
        }
    }
}