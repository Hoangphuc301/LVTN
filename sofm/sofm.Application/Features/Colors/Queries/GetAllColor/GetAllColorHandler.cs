using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Color;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Colors.Queries.GetAllColor
{
    public class GetAllColorHandler : IRequestHandler<GetAllColorQuery, List<ColorDto>>
    {
        private readonly IColorRepository _colorRepository;
        private readonly IMapper _mapper;   

        public GetAllColorHandler(IColorRepository colorRepository, IMapper mapper)
        {
            _colorRepository = colorRepository;
            _mapper = mapper;
        }

        public async Task<List<ColorDto>> Handle(GetAllColorQuery request, CancellationToken cancellationToken)
        {
            var entites = await _colorRepository.GetAllAsync();
            return entites.Select(x => new ColorDto
            {
                MaMau = x.MaMau,
                TenMau = x.TenMau,
                MaHex = x.MaHex,
                TrangThai = x.TrangThai ?? false,

                SoLuongSuDung = x.ChiTietSanPhams
                .Select(ct => ct.MaSp)
                .Distinct()
                .Count()
            }).ToList();
        }
    }
}
