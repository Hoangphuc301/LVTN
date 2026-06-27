import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/features/user/home/Pages/HomePage";
import { CartPage } from "@/features/user/cart/Pages/CartPage";
import { CheckoutPage } from "@/features/user/checkout/Pages/CheckOutPage";
import { OrderSuccessPage } from "@/features/user/checkout/Pages/OrderSuccessPage";
import { MainLayout } from "@/components/layout/MainLayout";
import { LoginPage } from "@/features/user/login/Pages/LoginPage";
import { ProfilePage } from "@/features/user/profile/Pages/ProfilePage";
import { AddressPage } from "@/features/user/profile/Pages/AddressPage";
import { OrderPage } from "@/features/user/profile/Pages/OrderPage";
import { PasswordPage } from "@/features/user/profile/Pages/ChangePasswordPage";
import { RegisterPage } from "@/features/user/register/Pages/RegisterPage";
import { ProductPage } from "@/features/user/product/Pages/ProductPage";
import { ProductDetailPage } from "@/features/user/product/Pages/ProductDetailPage";
import { ForgotPasswordPage } from "@/features/user/forgotPassword/Pages/ForgotPasswordPage";


import { AdminLayout } from "@/components/layout/AdminLayout";
import { DashboardAdmin } from "@/features/admin/homeAdmin/Pages/DashboardPage";
import { ProductAdmin } from "@/features/admin/productAdmin/Pages/ProductAdminPage";
import { ProductVariantAdmin } from "@/features/admin/productVariantAdmin/Pages/ProductVariantAdmin";
import { ProductVariantCreate } from "@/features/admin/productVariantAdmin/Pages/ProductVariantCreate";
import { ProductVariantEdit } from "@/features/admin/productVariantAdmin/Pages/ProductVariantEdit";
import { ProductCreateAdmin } from "@/features/admin/productAdmin/Pages/ProductCreatePage";
import { ProductEditAdmin } from "@/features/admin/productAdmin/Pages/ProductEditPage";
import { CategoryAdmin } from "@/features/admin/categoryAdmin/Pages/CategoryAdminPage";
import { CategoryChildren } from "@/features/admin/categoryAdmin/Pages/CategoryChildrenPage";
import { CategoryChildCreateAdmin } from "@/features/admin/categoryAdmin/Pages/CategoryCreatePage";
import { CategoryChildEditAdmin } from "@/features/admin/categoryAdmin/Pages/CategoryEditPage";
import { CategoryCreateParent } from "@/features/admin/categoryAdmin/Pages/CategoryCreateParent";
import { ColorAdmin } from "@/features/admin/colorAdmin/Pages/ColorAdminPage";
import { CreateColorAdmin } from "@/features/admin/colorAdmin/Pages/CreateColorPage";
import { EditColorAdmin } from "@/features/admin/colorAdmin/Pages/EditColorPage";
import { SizeAdmin } from "@/features/admin/sizeAdmin/Pages/SizeAdminPage";
import { SizeCreateAdmin } from "@/features/admin/sizeAdmin/Pages/SizeCreatePage";
import { SizeEditAdmin } from "@/features/admin/sizeAdmin/Pages/SizeEditPage";
import { OrderAdmin } from "@/features/admin/orderAdmin/Pages/OrderAdminPage";
import { OrderDetailAdmin } from "@/features/admin/orderAdmin/Pages/OrderDetailPage";
import { UpdateOrderStatusAdmin } from "@/features/admin/orderAdmin/Pages/UpdateOrderStatusPage";
import { ShippingAdmin } from "@/features/admin/ShippingAdmin/Pages/ShippingAdminPage";
import { VoucherAdmin} from "@/features/admin/voucherAdmin/Pages/VoucherAdminPage";
import { UserAdmin } from "@/features/admin/userAdmin/Pages/UserAdminPage";
import { ReportAdmin} from "@/features/admin/reportAdmin/Pages/ReportAdminPage";
export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* User */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/order-success"element={<OrderSuccessPage />}/>
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/profile/address" element={<AddressPage />} />
        <Route path="/profile/orders" element={<OrderPage />} />
        <Route path="/profile/change-password" element={<PasswordPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/shop" element={<ProductPage category="all" />} />
        <Route path="/nam" element={<ProductPage category="nam" />} />
        <Route path="/nu" element={<ProductPage category="nu" />} />
        <Route path="/phu-kien" element={<ProductPage category="phu-kien" />} />
        <Route path="/voucher" element={<ProductPage category="khuyen-mai" />} />
        <Route path="/product/:id" element={<ProductDetailPage/>} />        
      </Route>
      
      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />} />
        <Route path="products" element={<ProductAdmin />} />
        <Route path="/admin/products/:productId/variants" element={<ProductVariantAdmin />}/>
        <Route path="/admin/products/:productId/variants/create" element={<ProductVariantCreate />}/>
        <Route path="/admin/products/:productId/variants/edit/:maCtsp"element={<ProductVariantEdit />}/>
        <Route path="products/create" element={<ProductCreateAdmin />} />
        <Route path="products/edit/:id" element={<ProductEditAdmin />} />
        <Route path="categories" element={<CategoryAdmin />} />
        <Route path="categories/:id" element={<CategoryChildren />} />
        <Route path="/admin/categories/:id/create" element={<CategoryChildCreateAdmin />} />
        <Route path="/admin/categories/edit/:childId" element={<CategoryChildEditAdmin />} />
        <Route path="/admin/categories/create" element={<CategoryCreateParent />} />
        <Route path="colors" element={<ColorAdmin />} />
        <Route path="colors/create" element={<CreateColorAdmin />} />
        <Route path="colors/edit/:id" element={<EditColorAdmin />} />
        <Route path="sizes" element={<SizeAdmin />} />
        <Route path="sizes/create" element={<SizeCreateAdmin />} />
        <Route path="sizes/edit/:id" element={<SizeEditAdmin />} />
        <Route path="orders" element={<OrderAdmin />} />
        <Route path="/admin/orders/:id" element={<OrderDetailAdmin />}/>
        <Route path="/admin/orders/:id/edit" element={<UpdateOrderStatusAdmin />}/>
        <Route path="shipping" element={<ShippingAdmin />} />
        <Route path="vouchers" element={<VoucherAdmin />} />
        <Route path="users" element={<UserAdmin />} />
        <Route path="reports" element={<ReportAdmin />} />
      </Route>
    </Routes>
  </BrowserRouter>
);