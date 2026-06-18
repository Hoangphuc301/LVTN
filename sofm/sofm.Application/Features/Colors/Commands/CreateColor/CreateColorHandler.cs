using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Application.DTOs.Color;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Colors.Commands.CreateColor
{
    public class CreateColorHandler : IRequestHandler<CreateColorCommand, ColorDto>
    {
        private readonly IColorRepository _colorRepository;
        private readonly IMapper _mapper;

        public CreateColorHandler(IColorRepository colorRepository, IMapper mapper)
        {
            _colorRepository = colorRepository;
            _mapper = mapper;
        }
        public async Task<ColorDto> Handle(CreateColorCommand request, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<Mau>(request);
            var createdEntity = await _colorRepository.CreateAsync(entity);
            return _mapper.Map<ColorDto>(createdEntity);
        }
    }
}
