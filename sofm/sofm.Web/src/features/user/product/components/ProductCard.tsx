import { useNavigate } from "react-router-dom";
import type { Product } from "./productType";

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const navigate = useNavigate();

    const image =
        product.hinhAnh?.length > 0
            ? `/${product.hinhAnh[0]}`
            : "/placeholder.png";

    const isStopped =
        product.trangThai === false;

    const isOutOfStock =
        product.variants.every(
            (v) => v.soLuongTon <= 0
        );

    const handleClick = () => {
        if (isStopped) return;

        navigate(`/product/${product.maSp}`);
    };

    return (
        <div
            onClick={handleClick}
            className={`group ${
                isStopped
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
            }`}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 border-2 border-transparent hover:border-black transition-all">

                <img
                    src={image}
                    alt={product.tenSp}
                    className={`w-full h-full object-cover transition duration-500 ${
                        !isStopped
                            ? "group-hover:scale-105"
                            : "opacity-60"
                    }`}
                />

                {product.giaGiam && !isStopped && (
                    <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1">
                        SALE
                    </span>
                )}

                {isStopped && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 font-bold rounded">
                            NGỪNG BÁN
                        </span>
                    </div>
                )}

                {!isStopped && isOutOfStock && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="bg-gray-800 text-white px-4 py-2 font-bold rounded">
                            HẾT HÀNG
                        </span>
                    </div>
                )}
            </div>

            <h3
                className={`font-semibold text-lg ${
                    isStopped
                        ? "text-gray-500"
                        : ""
                }`}
            >
                {product.tenSp}
            </h3>

            <div className="mt-2 flex gap-3 items-center">
                {product.giaGiam ? (
                    <>
                        <span className="font-bold text-red-600">
                            {Number(
                                product.giaGiam
                            ).toLocaleString()} ₫
                        </span>

                        <span className="line-through text-gray-500">
                            {Number(
                                product.gia
                            ).toLocaleString()} ₫
                        </span>
                    </>
                ) : (
                    <span className="font-bold">
                        {Number(
                            product.gia
                        ).toLocaleString()} ₫
                    </span>
                )}
            </div>
        </div>
    );
};