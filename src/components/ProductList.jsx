// src/components/ProductList.js
import React, { useState } from "react";
import axios from "axios";

const ProductList = ({ products }) => {
  const [stockUpdates, setStockUpdates] = useState({});

  const handleInputChange = (productId, value) => {
    setStockUpdates({
      ...stockUpdates,
      [productId]: value,
    });
  };

  const handleUpdateClick = async (productId) => {
    const product = products.filter(
      (product) => product.productId === productId
    )[0];
    const newStock = stockUpdates[productId];
    product.productStockAmount = newStock;
    console.log(product);
    try {
      const response = await axios.put(`http://localhost:8080/api/products`, {
        productId: product.productId,
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productStockAmount: product.productStockAmount,
        productImageUrl: product.productImageUrl,
        productIsBestSeller: product.productIsBestSeller,
        category: {
          categoryId: product.category.categoryId,
        },
        brand: {
          brandId: product.brand.brandId,
        },
        volume: {
          volumeId: product.volume.volumeId,
        },
        gender: {
          genderId: product.gender.genderId,
        },
      });
      console.log(response.data.message);
      //onProductUpdated(response.data);
      setStockUpdates({
        ...stockUpdates,

        [productId]: "",
      });
    } catch (error) {
      console.error("Stok güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Ürün Listesi</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.productId}
            className="border p-2 rounded-md flex items-center justify-between"
          >
            <div>
              {product.productName} - {product.productPrice} TL{" "}
              {product.productStockAmount}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={stockUpdates[product.productId] || ""}
                onChange={(e) =>
                  handleInputChange(product.productId, e.target.value)
                }
                placeholder="Stok Güncelle"
                className="block w-24 px-2 py-1 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleUpdateClick(product.productId)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Güncelle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
