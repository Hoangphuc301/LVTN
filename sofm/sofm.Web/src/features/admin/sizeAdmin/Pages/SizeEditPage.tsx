import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SizeForm } from '../components/SizeForm';
import { getSizeById, updateSize } from '../components/sizeService';
import { type SizeDto } from "../components/SizeTypes";

export const SizeEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SizeDto>({
    maSize: 0,
    maDM: 0,
    tenDM: '',
    tenSize: '',
    moTa: '',
    trangThai: true,
  });

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const res = await getSizeById(Number(id));
        setFormData(res.data);
      } catch {
        alert("Không tìm thấy kích thước");
      }
    };
    fetchSize();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSize(Number(id), formData);
      alert("Cập nhật thành công");
      navigate('/admin/sizes');
    } catch {
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-medium text-[#e5e2e1] mb-6">Sửa kích thước</h1>
      <SizeForm 
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={handleSubmit} 
        buttonText="Lưu thay đổi" 
      />
    </div>
  );
};