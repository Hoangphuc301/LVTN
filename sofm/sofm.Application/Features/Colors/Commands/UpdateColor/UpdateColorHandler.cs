using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Color;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Colors.Commands.UpdateColor
{
    public class UpdateColorHandler : IRequestHandler<UpdateColorCommand, ColorDto>
    {
        private readonly IColorRepository _colorRepository;
        private readonly IMapper _mapper;

        public UpdateColorHandler(IColorRepository colorRepository, IMapper mapper)
        {
            _colorRepository = colorRepository;
            _mapper = mapper;
        }

        public async Task<ColorDto> Handle(UpdateColorCommand request, CancellationToken cancellationToken)
        {
            var entity = await _colorRepository.GetByIdAsync(request.MaMau);
            if (entity == null) throw new Exception("Không tìm thấy màu");
            _mapper.Map(request, entity);
            var updatedEntity = await _colorRepository.UpdateAsync(request.MaMau, entity);
            return _mapper.Map<ColorDto>(updatedEntity);
        }
    }
}
