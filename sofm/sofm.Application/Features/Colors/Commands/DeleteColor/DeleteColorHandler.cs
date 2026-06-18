using AutoMapper;
using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Colors.Commands.DeleteColor
{
    public class DeleteColorHandler : IRequestHandler<DeleteColorCommand, int>
    {
        private readonly IColorRepository _colorRepository;
        private readonly IMapper _mapper;

        public DeleteColorHandler(IColorRepository colorRepository, IMapper mapper)
        {
            _colorRepository = colorRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(DeleteColorCommand request, CancellationToken cancellationToken)
        {
            var kq = await _colorRepository.DeleteAsync(request.MaMau);
            return kq;
        }
    }
}
