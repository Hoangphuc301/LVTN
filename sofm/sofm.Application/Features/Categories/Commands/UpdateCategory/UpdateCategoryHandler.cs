using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Category;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryCommand, CategoryDto>
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public UpdateCategoryHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<CategoryDto> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var entity = await _categoryRepository.GetByIdAsync(request.MaDM);
            if (entity == null) throw new Exception("Không tìm thấy loại sản phẩm");
            _mapper.Map(request, entity);
            var updatedEntity = await _categoryRepository.UpdateAsync(request.MaDM, entity);
            return _mapper.Map<CategoryDto>(updatedEntity);
        }
    }
}
