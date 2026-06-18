using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Categories.Queries.GetChildrenCategory
{
    public class GetChildrenCategoriesHandler : IRequestHandler<GetChildrenCategoriesQuery, List<CategoryDto>>
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public GetChildrenCategoriesHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> Handle(GetChildrenCategoriesQuery request, CancellationToken cancellationToken)
        {
            var entities = await _categoryRepository.GetChildrenAsync(request.ParentId);
            return _mapper.Map<List<CategoryDto>>(entities);
        }
    }
}
