import { Outlet } from 'react-router-dom';
import { AdminSidebarSection } from '@/features/admin/homeAdmin/components/AdminSidebarSection';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[rgb(120,120,102)]">
      <AdminSidebarSection />

      <div className="pl-64 w-full"> 
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};