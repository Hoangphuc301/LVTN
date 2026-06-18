import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../components/productService";
import { getVariantsByProduct } from "../components/productVariantService";
import type { ProductVariant } from "../components/productVariantType";
import { useCart } from "../../cart/components/useCart";

interface Product {
    maSp: number;
    tenSp: string;
    gia: number;
    giaGiam?: number | null;
    moTa?: string | null;
    hinhAnh: string[];
    trangThai?: boolean | null;
}

interface CartItem {
    maCtsp: number;

    maSp: number;

    tenSp: string;

    hinhAnh: string;

    mau: string;

    size: string;

    donGia: number;

    soLuong: number;

    createdAt?: string;
}

export const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [openDescription, setOpenDescription] = useState(true);
    const [openSpecification, setOpenSpecification] = useState(false);
    const [openReview, setOpenReview] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;
        const productId = Number(id);
        const fetchData = async () => {
            try {
                const [pRes, vRes] = await Promise.all([getProductById(productId), getVariantsByProduct(productId)]);
                setProduct(pRes.data as Product);
                setVariants(vRes.data);
                if (vRes.data.length > 0) { setSelectedColor(vRes.data[0].maMau); setSelectedSize(vRes.data[0].maSize); }
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [id]);

    const colors = useMemo(() => Array.from(new Map(variants.map((v) => [v.maMau, v])).values()), [variants]);
    const sizesByColor = useMemo(() => variants.filter((v) => v.maMau === selectedColor), [variants, selectedColor]);
    const selectedVariant = useMemo(() => variants.find((v) => v.maMau === selectedColor && v.maSize === selectedSize), [variants, selectedColor, selectedSize]);

    const isOutOfStock = !selectedVariant || selectedVariant.soLuongTon <= 0;
    const isDiscontinued = product?.trangThai === false;
    const currentPrice = product?.giaGiam != null ? product.giaGiam : product?.gia || 0;

    const handleSelectColor = (maMau: number) => {
        setSelectedColor(maMau);
        const firstSize = variants.find((v) => v.maMau === maMau);
        if (firstSize) { setSelectedSize(firstSize.maSize); setQuantity(1); }
    };

    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    const increaseQuantity = () => {
        if (!selectedVariant) return;
        setQuantity((prev) => (prev < selectedVariant.soLuongTon ? prev + 1 : prev));
    };

    const buildCartItem = (): CartItem | null => {
    if (!product || !selectedVariant)
        return null;
        return {
            maCtsp: selectedVariant.maCtsp,
            maSp: product.maSp,
            tenSp: product.tenSp,
            hinhAnh:product.hinhAnh?.[0] || "",
            mau:selectedVariant.tenMau || "",
            size:selectedVariant.tenSize ||"",
            donGia: currentPrice,
            soLuong: quantity,
        };
    };

    const handleAddToCart = async () => {
        if (isDiscontinued) {
            alert("Sản phẩm đã ngừng bán");
            return;
        }
        
        const item = buildCartItem();
        if (!item) return;
        await addToCart({
            maCtsp: item.maCtsp,
            maSp: item.maSp,
            tenSp: item.tenSp,
            hinhAnh: item.hinhAnh,
            mau: item.mau,
            size: item.size,
            donGia: item.donGia,
            soLuong: item.soLuong,
        });

        alert("Đã thêm vào giỏ hàng");
    };

    const handleBuyNow = () => {
        if (isDiscontinued) {
            alert("Sản phẩm đã ngừng bán");
            return;
        }
        const item = buildCartItem();
        if (!item) return;
        localStorage.setItem(
            "checkout_items",
            JSON.stringify([item])
        );
        navigate("/checkout");
    };

    if (!product) return <div className="p-10 text-center">Đang tải...</div>;

    if (product.trangThai === false)
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f9f9f7]">
            <div className="bg-white p-10 rounded-lg shadow text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    Sản phẩm đã ngừng bán
                </h1>
                <p className="text-gray-500 mb-6">
                    Sản phẩm này hiện không còn được kinh doanh.
                </p>
                <button onClick={() => navigate("/shop")} className="px-6 py-3 bg-black text-white rounded">
                    Quay lại cửa hàng
                </button>
            </div>
        </main>
    );

    return (
        <main className="bg-[#f9f9f7] min-h-screen py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 px-10">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        {product.hinhAnh?.map((img, i) => (
                            <img key={i} src={`/${img}`} alt="" onClick={() => setActiveImage(i)} className={`w-20 h-24 rounded-lg object-cover cursor-pointer border-2 ${activeImage === i ? "border-black" : "border-gray-300"}`} />
                        ))}
                    </div>
                    <div className="w-[500px] h-[650px] bg-white border rounded-xl overflow-hidden flex items-center justify-center">
                        <img src={`/${product.hinhAnh?.[activeImage]}`} alt={product.tenSp} className="w-full h-full object-contain" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-serif font-bold">{product.tenSp}</h1>
                    {product.giaGiam != null ? (
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-red-600">{currentPrice.toLocaleString()} ₫</span>
                            <span className="text-xl text-gray-400 line-through">{product.gia.toLocaleString()} ₫</span>
                        </div>
                    ) : <p className="text-3xl font-bold">{product.gia.toLocaleString()} ₫</p>}
                    
                    <div>
                        <p className="font-bold mb-3">Màu sắc</p>
                        <div className="flex flex-wrap gap-3">
                            {colors.map((c) => (
                                <button key={c.maMau} onClick={() => handleSelectColor(c.maMau)} className={`px-4 py-2 rounded-lg border transition ${selectedColor === c.maMau ? "bg-black text-white border-black" : "bg-white border-gray-300"}`}>{c.tenMau}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-3"><p className="font-bold">Kích thước</p><button className="text-sm underline text-gray-500">Hướng dẫn chọn size</button></div>
                        <div className="flex flex-wrap gap-2">
                            {sizesByColor.map((s) => (
                                <button key={s.maCtsp} onClick={() => setSelectedSize(s.maSize)} disabled={s.soLuongTon <= 0} className={`w-14 h-14 border-2 font-bold transition ${selectedSize === s.maSize ? "bg-black text-white border-black" : "border-black"} ${s.soLuongTon <= 0 ? "opacity-30 cursor-not-allowed" : ""}`}>{s.tenSize}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="font-bold mb-3">Số lượng</p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border w-fit rounded-lg overflow-hidden">
                                <button onClick={decreaseQuantity} className="w-12 h-12 text-xl hover:bg-gray-100">-</button>
                                <div className="w-14 text-center font-bold">{quantity}</div>
                                <button onClick={increaseQuantity} className="w-12 h-12 text-xl hover:bg-gray-100">+</button>
                            </div>
                            <div className="font-bold">
                                {isDiscontinued ? (
                                    <span className="text-red-600 font-bold">
                                        Ngừng bán
                                    </span>
                                ) : isOutOfStock ? (
                                    <span className="text-red-500">
                                        Hết hàng
                                    </span>
                                ) : (
                                    <span className="text-green-600">
                                        Còn hàng ({selectedVariant?.soLuongTon})
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-gray-200">
                        <button onClick={handleAddToCart} disabled={isOutOfStock ||isDiscontinued} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50">
                            Thêm vào giỏ hàng
                        </button>
                        <button onClick={handleBuyNow} disabled={isOutOfStock ||isDiscontinued} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50">
                            Mua ngay
                        </button>
                    </div>

                    <div className="pt-8 space-y-4 text-sm uppercase tracking-wider">
                        <div className="border-b py-4">
                            <button onClick={() => setOpenDescription(!openDescription)} className="w-full flex justify-between font-bold">
                              <span>Mô tả sản phẩm</span><span>{openDescription ? "^" : "v"}</span>
                            </button>
                            {openDescription && <p className="mt-4 text-gray-600 normal-case leading-7">{product.moTa || "Đang cập nhật..."}</p>}
                        </div>
                        <div className="border-b py-4">
                            <button onClick={() => setOpenSpecification(!openSpecification)} className="w-full flex justify-between font-bold">
                              <span>Thông số kỹ thuật</span><span>{openSpecification ? "^" : "v"}</span>
                            </button>
                            {openSpecification && <div className="mt-4 text-gray-600 normal-case leading-7">
                                <p>• Chất liệu cao cấp</p>
                                <p>• Form chuẩn</p>
                            </div>}
                        </div>
                        <div className="border-b py-4">
                            <button onClick={() => setOpenReview(!openReview)} className="w-full flex justify-between font-bold">
                              <span>Đánh giá</span><span>{openReview ? "^" : "v"}</span>
                            </button>
                            {openReview && <div className="mt-4 text-gray-600 normal-case leading-7">Chưa có đánh giá nào.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};