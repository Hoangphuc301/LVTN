using AutoMapper;
using sofm.Application.DTOs.OrderAdmin;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<DonHang, OrderListDto>()
                .ForMember(d => d.MaDH, o => o.MapFrom(s => s.MaDh))
                .ForMember(d => d.TenKhach, o => o.MapFrom(s => s.MaKhNavigation.TenKh))
                .ForMember(d => d.Sdt, o => o.MapFrom(s => s.Sdtgiao))
                .ForMember(d => d.TongTienCuoi, o => o.MapFrom(s => s.TongTienCuoi ?? 0))
                .ForMember(d => d.TrangThai, o => o.MapFrom(s => s.TrangThai))
                .ForMember(d => d.NgayDat, o => o.MapFrom(s => s.NgayDat ?? DateTime.MinValue));

            CreateMap<DonHang, OrderDetailDto>()
                .ForMember(d => d.MaDH, o => o.MapFrom(s => s.MaDh))
                .ForMember(d => d.TenKhach, o => o.MapFrom(s => s.MaKhNavigation.TenKh))
                .ForMember(d => d.Sdt, o => o.MapFrom(s => s.Sdtgiao))
                .ForMember(d => d.DiaChi, o => o.MapFrom(s => s.DiaChiGiao))
                .ForMember(d => d.TongTien, o => o.MapFrom(s => s.TongTien))
                .ForMember(d => d.PhiShip, o => o.MapFrom(s => s.PhiShip ?? 0))
                .ForMember(d => d.TongTienCuoi, o => o.MapFrom(s => s.TongTienCuoi ?? 0))
                .ForMember(d => d.TrangThai, o => o.MapFrom(s => s.TrangThai))
                .ForMember(d => d.NgayDat, o => o.MapFrom(s => s.NgayDat ?? DateTime.MinValue))
                .ForMember(d => d.Items, o => o.MapFrom(s => s.ChiTietDonHangs));

            CreateMap<ChiTietDonHang, OrderDetailItemDto>()
                .ForMember(d => d.MaCTSP, o => o.MapFrom(s => s.MaCtsp))
                .ForMember(d => d.TenSP, o => o.MapFrom(s => s.MaCtspNavigation.MaSpNavigation.TenSp))
                .ForMember(d => d.Mau, o => o.MapFrom(s => s.MaCtspNavigation.MaMauNavigation.TenMau))
                .ForMember(d => d.Size, o => o.MapFrom(s => s.MaCtspNavigation.MaSizeNavigation.TenSize))
                .ForMember(d => d.SoLuong, o => o.MapFrom(s => s.Sl))
                .ForMember(d => d.DonGia, o => o.MapFrom(s => s.DonGia))
                .ForMember(d => d.ThanhTien, o => o.MapFrom(s => s.ThanhTien));

            CreateMap<LichSuDonHang, OrderHistoryDto>();
        }
    }
}