using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CreateCategoryHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var entity = new DanhMuc
            {
                TenDm = request.TenDM,
                MoTa = request.MoTa,
                TrangThai = request.TrangThai,
                MaDmCha = request.MaDmCha,

                MaDmChaNavigation = null
            };

            var createdEntity = await _categoryRepository.CreateAsync(entity);
            return _mapper.Map<CategoryDto>(createdEntity);

        }
    }
}
