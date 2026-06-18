using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Products.Commands.Create
{
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductDetailDto>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public CreateProductHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<ProductDetailDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new SanPham
            {
                TenSp = request.TenSp,
                Gia = request.Gia,
                GiaGiam = request.GiaGiam,
                MoTa = request.MoTa,
                TrangThai = true,
                MaDm = request.MaDm,
                MaTh = request.MaTh,

                HinhSanPhams = request.HinhAnhUrls.Select(url => new HinhSanPham
                {
                    DuongDan = url
                }).ToList(),

                ChiTietSanPhams = request.Variants.Select(v => new ChiTietSanPham
                {
                    MaMau = v.MaMau,
                    MaSize = v.MaSize,
                    Slton = v.SoLuongTon
                }).ToList()
            };

            var created = await _productRepository.CreateAsync(product);

            var result = await _productRepository.GetByIdWithDetailAsync(created.MaSp);

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
                    MaMau = v.MaMau,
                    TenMau = v.MaMauNavigation.TenMau,
                    MaSize = v.MaSize,
                    TenSize = v.MaSizeNavigation.TenSize,
                    SoLuongTon = v.Slton ?? 0
                }).ToList()
            };
        }    
    }
}
