using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Application.DTOs.Size;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Sizes.Commands.UpdateSize
{
    public class UpdateSizeHandler : IRequestHandler<UpdateSizeCommand, SizeDto>
    {
        private readonly ISizeRepository _sizeRepository;
        private readonly IMapper _mapper;

        public UpdateSizeHandler(ISizeRepository sizeRepository, IMapper mapper)
        {
            _sizeRepository = sizeRepository;
            _mapper = mapper;
        }

        public async Task<SizeDto> Handle(UpdateSizeCommand request, CancellationToken cancellationToken)
        {
            var entity = await _sizeRepository.GetByIdAsync(request.MaSize);
            if (entity == null) throw new Exception("Không tìm thấy kích thước");
            _mapper.Map(request, entity);
            var updatedEntity = await _sizeRepository.UpdateAsync(request.MaSize, entity);
            return _mapper.Map<SizeDto>(updatedEntity);
        }
    }
}
