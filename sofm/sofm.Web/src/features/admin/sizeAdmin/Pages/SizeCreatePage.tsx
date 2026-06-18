import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SizeForm } from '../components/SizeForm';
import { createSize } from '../components/sizeService';
import type { SizeDto } from '../components/SizeTypes';

export const SizeCreateAdmin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SizeDto>({ 
    maSize: 0,
    maDM: 0,
    tenDM: '',
    tenSize: '',
    moTa: '',
    trangThai: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: SizeDto = {
      maSize: 0, 
      maDM: formData.maDM, 
      tenDM: '', 
      tenSize: formData.tenSize,
      moTa: formData.moTa || "",
      trangThai: formData.trangThai
    };

    try {
      await createSize(payload); 
      
      alert("Thêm thành công!");
      navigate('/admin/sizes');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error("Lỗi khi thêm size:", error);
      alert("Thêm thất bại: " + (error.response?.data?.message || "Kiểm tra lại dữ liệu"));
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-medium text-[#e5e2e1] mb-6">Thêm mới Size</h1>
      <SizeForm 
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={handleSubmit} 
        buttonText="Thêm kích thước" 
      />
    </div>
  );
};