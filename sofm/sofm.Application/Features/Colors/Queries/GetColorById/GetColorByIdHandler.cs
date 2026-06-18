using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Application.DTOs.Color;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Colors.Queries.GetColorById
{
    public class GetColorByIdHandler : IRequestHandler<GetColorByIdQuery, ColorDto>
    {
        private readonly IColorRepository _colorRepository;
        private readonly IMapper _mapper;

        public GetColorByIdHandler(IColorRepository colorRepository, IMapper mapper)
        {
            _colorRepository = colorRepository;
            _mapper = mapper;
        }

        public async Task<ColorDto> Handle(GetColorByIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await _colorRepository.GetByIdAsync(request.MaMau);
            return _mapper.Map<ColorDto>(entity);
        }
    }
}
