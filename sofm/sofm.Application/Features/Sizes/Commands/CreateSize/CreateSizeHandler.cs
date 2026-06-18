using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Size;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Sizes.Commands.CreateSize
{
    public class CreateSizeHandler : IRequestHandler<CreateSizeCommand, SizeDto>
    {
        private readonly ISizeRepository _sizeRepository;
        private readonly IMapper _mapper;

        public CreateSizeHandler(ISizeRepository sizeRepository, IMapper mapper)
        {
            _sizeRepository = sizeRepository;
            _mapper = mapper;
        }

        public async Task<SizeDto> Handle(CreateSizeCommand request, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<Size>(request);
            if (entity.MaDm == 0) entity.MaDm = null;
            var createdEntity = await _sizeRepository.CreateAsync(entity);
            return _mapper.Map<SizeDto>(createdEntity);
        }
    }
}
