using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Size;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Sizes.Queries.GetAllSize
{
    public class GetAllSizeHandler :IRequestHandler<GetAllSizeQuery, List<SizeDto>> 
    {
        private readonly ISizeRepository _sizeRepository;
        private readonly IMapper _mapper;

        public GetAllSizeHandler(ISizeRepository sizeRepository, IMapper mapper)
        {
            _sizeRepository = sizeRepository;
            _mapper = mapper;
        }

        public async Task<List<SizeDto>> Handle(GetAllSizeQuery request, CancellationToken cancellationToken)
        {

            var entities = await _sizeRepository.GetAllAsync();
            return _mapper.Map<List<SizeDto>>(entities);
        }
    }
}
