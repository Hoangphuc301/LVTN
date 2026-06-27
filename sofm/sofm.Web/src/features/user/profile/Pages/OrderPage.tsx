import { AccountSidebar } from "../components/AccountSidebar";

export const OrderPage = () => {
  return (
    <main className="min-h-screen bg-[#f7f5f2] py-12">
      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        <AccountSidebar />

        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-serif mb-2">
              Đơn hàng của tôi
            </h1>

            <p className="text-gray-500 mb-8">
              Theo dõi các đơn hàng đã đặt
            </p>

            <div className="border border-dashed border-gray-300 rounded-xl py-20 text-center">
              <h3 className="text-xl font-medium text-gray-700">
                Chưa có dữ liệu đơn hàng
              </h3>

              <p className="text-gray-500 mt-2">
                Chức năng này sẽ được hoàn thiện sau
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};