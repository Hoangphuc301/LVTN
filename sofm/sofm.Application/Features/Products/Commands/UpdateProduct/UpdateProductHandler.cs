using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, ProductDetailDto>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public UpdateProductHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<ProductDetailDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var productEntity = new SanPham
            {
                MaSp = request.MaSp,
                TenSp = request.TenSp,
                Gia = request.Gia,
                GiaGiam = request.GiaGiam,
                MoTa = request.MoTa,
                TrangThai = request.TrangThai,
                MaDm = request.MaDm,
                MaTh = request.MaTh,

                ChiTietSanPhams = request.Variants.Select(v => new ChiTietSanPham
                {
                    MaCtsp = v.MaCtsp ?? 0,
                    MaMau = v.maMau,
                    MaSize = v.maSize,
                    Slton = v.soLuongTon
                }).ToList(),

                HinhSanPhams = request.HinhAnhUrls?
                    .Select(url => new HinhSanPham
                    {
                        MaSp = request.MaSp,
                        DuongDan = url
                    })
                    .ToList()
                    ?? new List<HinhSanPham>()
            };

            await _productRepository.UpdateProductWithVariantsAsync(productEntity);
            var result = await _productRepository.GetByIdWithDetailAsync(request.MaSp);
            if (result == null) throw new Exception("Cập nhật thành công nhưng không thể truy xuất dữ liệu sản phẩm.");

            return new ProductDetailDto
            {
                MaSp = result.MaSp,
                TenSp = result.TenSp,
                Gia = result.Gia,
                GiaGiam = result.GiaGiam,
                MoTa = result.MoTa,
                TrangThai = result.TrangThai,
                MaDm = result.MaDm,
                MaTh = result.MaTh,
                TenDanhMuc = result.MaDmNavigation?.TenDm,
                MaDmCha = result.MaDmNavigation?.MaDmCha,
                TenDanhMucCha = result.MaDmNavigation?.MaDmChaNavigation?.TenDm,
                HinhAnh = result.HinhSanPhams.Select(h => h.DuongDan).ToList(),
                Variants = result.ChiTietSanPhams.Select(v => new ProductVariantDto
                {
                    MaCtsp = v.MaCtsp,
                    MaMau = v.MaMau,
                    TenMau = v.MaMauNavigation?.TenMau ?? "",
                    MaSize = v.MaSize,
                    TenSize = v.MaSizeNavigation?.TenSize ?? "",
                    SoLuongTon = v.Slton ?? 0
                }).ToList()
            };
        }
    }
}