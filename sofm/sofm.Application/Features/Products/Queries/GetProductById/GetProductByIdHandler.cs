
using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Products.Queries.GetProductById
{
    public class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, ProductDetailDto>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public GetProductByIdHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<ProductDetailDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _productRepository.GetByIdWithDetailAsync(request.MaSp);

            if (result == null) throw new Exception("Không tìm thấy sản phẩm");

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

                Variants = result.ChiTietSanPhams
                    .Select(v => new ProductVariantDto
                    {
                        MaCtsp = v.MaCtsp,
                        MaMau = v.MaMau,
                        TenMau = v.MaMauNavigation.TenMau,
                        MaSize = v.MaSize,
                        TenSize = v.MaSizeNavigation.TenSize,
                        SoLuongTon = v.Slton ?? 0
                    })
                    .ToList()
            };
        }
    }
}
