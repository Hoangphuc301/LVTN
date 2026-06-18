using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Categories.Queries.GetAllCategory
{
    public class GetAllCategoryHandler : IRequestHandler<GetAllCategoryQuery, List<CategoryDto>>
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public GetAllCategoryHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> Handle(GetAllCategoryQuery request, CancellationToken cancellationToken)
        {
            var entites = await _categoryRepository.GetAllAsync();
            return _mapper.Map<List<CategoryDto>>(entites);
        }
    }
}
