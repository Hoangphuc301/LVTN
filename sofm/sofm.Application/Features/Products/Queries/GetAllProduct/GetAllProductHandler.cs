using MediatR;
using sofm.Domain.Interfaces;
using AutoMapper;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.Products.Queries.GetAllProduct
{
    public class GetAllProductHandler : IRequestHandler<GetAllProductQuery, List<ProductDetailDto>>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public GetAllProductHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<List<ProductDetailDto>> Handle(GetAllProductQuery request, CancellationToken cancellationToken)
        {
            var entities = await _productRepository.GetAllAsync();

            return entities.Select(x => new ProductDetailDto
            {
                MaSp = x.MaSp,
                TenSp = x.TenSp,
                Gia = x.Gia,
                GiaGiam = x.GiaGiam,
                MoTa = x.MoTa,
                TrangThai = x.TrangThai,
                MaDm = x.MaDm,
                MaTh = x.MaTh,

                TenDanhMuc = x.MaDmNavigation?.TenDm,
                MaDmCha = x.MaDmNavigation?.MaDmCha,
                TenDanhMucCha = x.MaDmNavigation?.MaDmChaNavigation?.TenDm,

                HinhAnh = x.HinhSanPhams.Select(h => h.DuongDan).ToList(),

                Variants = x.ChiTietSanPhams.Select(v => new ProductVariantDto
                {
                    MaMau = v.MaMau,
                    TenMau = v.MaMauNavigation.TenMau,
                    MaSize = v.MaSize,
                    TenSize = v.MaSizeNavigation.TenSize,
                    SoLuongTon = v.Slton ?? 0
                }).ToList()

            }).ToList();
        }
    }
}
