using AutoMapper;
using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Sizes.Commands.DeleteSize
{
    public class DeleteSizeHandler : IRequestHandler<DeleteSizeCommand, int>
    {
        private readonly ISizeRepository _sizeRepository;
        private readonly IMapper _mapper;

        public DeleteSizeHandler(ISizeRepository sizeRepository, IMapper mapper)
        {
            _sizeRepository = sizeRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(DeleteSizeCommand request, CancellationToken cancellationToken)
        {
            var kq = await _sizeRepository.DeleteAsync(request.MaSize);
            return kq;
        }
    }
}
