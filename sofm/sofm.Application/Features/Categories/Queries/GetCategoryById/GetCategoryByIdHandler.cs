using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Application.DTOs.Product;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Categories.Queries.GetCategoryById
{
    public class GetCategoryByIdHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>    
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public GetCategoryByIdHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await _categoryRepository.GetByIdAsync(request.MaDM);
            return _mapper.Map<CategoryDto>(entity);
        }
    }
}
