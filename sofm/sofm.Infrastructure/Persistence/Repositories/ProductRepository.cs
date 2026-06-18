using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class ProductRepository : GenericRepository<SanPham>, IProductRepository
    {
        private readonly SofmDbContext _sofmDbContext;

        public ProductRepository(SofmDbContext sofmDbContext) : base(sofmDbContext)
        {
            _sofmDbContext = sofmDbContext;
        }

        public async Task<List<SanPham>> GetAllAsync()
        {
            return await _sofmDbContext.SanPhams
             .Include(x => x.MaDmNavigation)
                 .ThenInclude(x => x.MaDmChaNavigation)
             .Include(x => x.ChiTietSanPhams)
                 .ThenInclude(x => x.MaMauNavigation)
             .Include(x => x.ChiTietSanPhams)
                 .ThenInclude(x => x.MaSizeNavigation)
             .Include(s => s.HinhSanPhams)
             .ToListAsync();
        }

        public async Task<SanPham> GetByIdAsync(int id)
        {
            return await _sofmDbContext.SanPhams
                .FirstOrDefaultAsync(x => x.MaSp == id);
        }

        public async Task<SanPham> CreateAsync(SanPham sp)
        {
            await _sofmDbContext.SanPhams.AddAsync(sp);
            if (sp.HinhSanPhams != null)
            {
                foreach (var hinh in sp.HinhSanPhams)
                {
                    hinh.MaSpNavigation = sp;
                }
            }
            await _sofmDbContext.SaveChangesAsync();
            return sp;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _sofmDbContext.SanPhams
                .Where(x => x.MaSp == id)
                .ExecuteDeleteAsync();
        }

        public async Task<SanPham> UpdateAsync(int id, SanPham sp)
        {
            var existing = await _sofmDbContext.SanPhams
                .Include(x => x.ChiTietSanPhams)
                .FirstOrDefaultAsync(x => x.MaSp == id);

            if (existing == null) throw new Exception("Không tìm thấy sản phẩm");

            existing.TenSp = sp.TenSp;
            existing.Gia = sp.Gia;
            existing.GiaGiam = sp.GiaGiam;
            existing.MoTa = sp.MoTa;
            existing.TrangThai = sp.TrangThai;
            existing.MaDm = sp.MaDm;
            existing.MaTh = sp.MaTh;
            var incomingIds = sp.ChiTietSanPhams.Where(v => v.MaCtsp > 0).Select(v => v.MaCtsp).ToList();

            var toDelete = existing.ChiTietSanPhams.Where(x => !incomingIds.Contains(x.MaCtsp)).ToList();
            _sofmDbContext.ChiTietSanPhams.RemoveRange(toDelete);

            foreach (var v in sp.ChiTietSanPhams)
            {
                if (v.MaCtsp > 0)
                {
                    var existingVariant = existing.ChiTietSanPhams.FirstOrDefault(x => x.MaCtsp == v.MaCtsp);
                    if (existingVariant != null)
                    {
                        existingVariant.MaMau = v.MaMau;
                        existingVariant.MaSize = v.MaSize;
                        existingVariant.Slton = v.Slton;
                    }
                }
                else
                {
                    existing.ChiTietSanPhams.Add(new ChiTietSanPham
                    {
                        MaSp = id,
                        MaMau = v.MaMau,
                        MaSize = v.MaSize,
                        Slton = v.Slton
                    });
                }
            }

            await _sofmDbContext.SaveChangesAsync();
            return existing;
        }

        public async Task<SanPham> GetByIdWithDetailAsync(int id)
        {
            return await _context.SanPhams
                .Include(x => x.ChiTietSanPhams)
                    .ThenInclude(x => x.MaMauNavigation)
                .Include(x => x.ChiTietSanPhams)
                    .ThenInclude(x => x.MaSizeNavigation)
                .Include(x => x.MaDmNavigation)
                    .ThenInclude(x => x.MaDmChaNavigation)
                .Include(x => x.HinhSanPhams)
                .FirstOrDefaultAsync(x => x.MaSp == id);
        }

        public async Task UpdateProductWithVariantsAsync(SanPham product)
        {
            var existing = await _sofmDbContext.SanPhams
                .Include(x => x.ChiTietSanPhams)
                .Include(x => x.HinhSanPhams)
                .FirstOrDefaultAsync(x => x.MaSp == product.MaSp);

            if (existing == null)
                throw new Exception("Không tìm thấy sản phẩm");

            existing.TenSp = product.TenSp;
            existing.Gia = product.Gia;
            existing.GiaGiam = product.GiaGiam;
            existing.MoTa = product.MoTa;
            existing.TrangThai = product.TrangThai;
            existing.MaDm = product.MaDm;
            existing.MaTh = product.MaTh;

            if (product.HinhSanPhams != null && product.HinhSanPhams.Any())
            {
                var oldImages = existing.HinhSanPhams.ToList();

                _sofmDbContext.HinhSanPhams.RemoveRange(oldImages);

                foreach (var h in product.HinhSanPhams)
                {
                    existing.HinhSanPhams.Add(new HinhSanPham
                    {
                        MaSp = existing.MaSp,
                        DuongDan = h.DuongDan,
                        TenHinh = h.TenHinh,
                        DaiDien = h.DaiDien,
                        ThuTu = h.ThuTu
                    });
                }
            }

            var incomingVariants = product.ChiTietSanPhams;

            var idsInPayload = incomingVariants
                .Where(v => v.MaCtsp > 0)
                .Select(v => v.MaCtsp)
                .ToList();

            var toDelete = existing.ChiTietSanPhams
                .Where(x => !idsInPayload.Contains(x.MaCtsp))
                .ToList();

            _sofmDbContext.ChiTietSanPhams.RemoveRange(toDelete);

            foreach (var v in incomingVariants)
            {
                if (v.MaCtsp > 0)
                {
                    var existingVariant = existing.ChiTietSanPhams
                        .FirstOrDefault(x => x.MaCtsp == v.MaCtsp);

                    if (existingVariant != null)
                    {
                        existingVariant.MaMau = v.MaMau;
                        existingVariant.MaSize = v.MaSize;
                        existingVariant.Slton = v.Slton;
                    }
                }
                else
                {
                    existing.ChiTietSanPhams.Add(new ChiTietSanPham
                    {
                        MaSp = existing.MaSp,
                        MaMau = v.MaMau,
                        MaSize = v.MaSize,
                        Slton = v.Slton
                    });
                }
            }

            try
            {
                await _sofmDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ex.InnerException?.Message ?? ex.Message
                );
            }
        }
    }
}