using AutoMapper;

namespace sofm.Application.Common.Mapping
{
    public class BaseMappingProfile<TEntity, TCreate, TUpdate, TDelete, TRead> : Profile
    {
        public BaseMappingProfile()
        {
            CreateMap<TEntity, TRead>().ReverseMap();
            CreateMap<TCreate, TEntity>();
            CreateMap<TUpdate, TEntity>();
            CreateMap<TDelete, TEntity>();
        }
    }
}