using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sofm.Application.DTOs.Category;
using sofm.Application.Features.Categories.Commands.CreateCategory;
using sofm.Application.Features.Categories.Commands.DeleteCategory;
using sofm.Application.Features.Categories.Commands.UpdateCategory;
using sofm.Application.Features.Categories.Queries.GetAllCategory;
using sofm.Application.Features.Categories.Queries.GetCategoryById;
using sofm.Application.Features.Categories.Queries.GetChildrenCategory;
using sofm.Application.Features.Categories.Queries.GetParentCategory;

namespace sofm.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategory()
        {
            var query = new GetAllCategoryQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var res = await _mediator.Send(new DeleteCategoryCommand { MaDM = id });
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, UpdateCategoryCommand command)
        {
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var res = await _mediator.Send(new GetCategoryByIdQuery { MaDM = id });
            return Ok(res);
        }

        [HttpGet("parents")]
        public async Task<IActionResult> GetParents()
        {
            var result = await _mediator.Send(new GetParentCategoriesQuery());
            return Ok(result);
        }

        [HttpGet("{parentId}/children")]
        public async Task<IActionResult> GetChildren(int parentId)
        {
            var result = await _mediator.Send(new GetChildrenCategoriesQuery(parentId));
            return Ok(result);
        }
    }
}
