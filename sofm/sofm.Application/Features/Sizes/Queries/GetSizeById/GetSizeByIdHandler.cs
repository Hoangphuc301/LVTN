using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Size;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Sizes.Queries.GetSizeById
{
    public class GetSizeByIdHandler : IRequestHandler<GetSizeByIdQuery, SizeDto>
    {
        private readonly ISizeRepository _sizeRepository;
        private readonly IMapper _mapper;

        public GetSizeByIdHandler(ISizeRepository sizeRepository, IMapper mapper)
        {
            _sizeRepository = sizeRepository;
            _mapper = mapper;
        }

        public async Task<SizeDto> Handle(GetSizeByIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await _sizeRepository.GetByIdAsync(request.MaSize);
            return _mapper.Map<SizeDto>(entity);
        }
    }
}
