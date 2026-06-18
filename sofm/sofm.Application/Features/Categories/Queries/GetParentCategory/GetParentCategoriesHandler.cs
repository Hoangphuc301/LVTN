using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Categories.Queries.GetParentCategory
{
    public class GetParentCategoriesHandler : IRequestHandler<GetParentCategoriesQuery, List<CategoryDto>>
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public GetParentCategoriesHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> Handle(GetParentCategoriesQuery request, CancellationToken cancellationToken)
        {
            var entities = await _categoryRepository.GetParentCategoriesAsync();
            return _mapper.Map<List<CategoryDto>>(entities);
        }
    }
}
