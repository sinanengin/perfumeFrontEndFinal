// src/components/ProductForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductForm = ({ onProductAdded }) => {
  const [productIsBestSeller, setProductIsBestSeller] = useState(true);
  const [genderId, setGenderId] = useState(0);
  const [status, setStatus] = useState(true);
  const [brandId, setBrandId] = useState(0);
  const [volumeId, setVolumeId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productImgUrl, setProductImgUrl] = useState("");
  const [stockAmount, setStockAmount] = useState(0);
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [volumeList, setVolumeList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios("http://localhost:8080/api/categories");
      const data = response.data.data;
      setCategoryList(data);
    };
    const fetchBrand = async () => {
      const response = await axios("http://localhost:8080/api/brands");
      const data = response.data.data;
      setBrandList(data);
    };
    const fetchGender = async () => {
      const response = await axios("http://localhost:8080/api/genders");
      const data = response.data.data;
      setGenderList(data);
    };
    const fetchVolume = async () => {
      const response = await axios("http://localhost:8080/api/volumes");
      const data = response.data.data;
      setVolumeList(data);
    };
    fetchCategory();
    fetchVolume();
    fetchGender();
    fetchBrand();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      productStockAmount: stockAmount,
      productImageUrl: productImgUrl,
      productIsBestSeller: productIsBestSeller,
      category: {
        categoryId: categoryId,
      },
      brand: {
        brandId: brandId,
      },
      volume: {
        volumeId: volumeId,
      },
      gender: {
        genderId: genderId,
      },
    };

    console.log(product);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/products",
        product
      );
      console.log(response.data);
      onProductAdded(product);
    } catch (error) {
      console.error("Ürün eklerken hata oluştu:", error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Ürün Ekleme</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Ürün Adı"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          value={productImgUrl}
          onChange={(e) => setProductImgUrl(e.target.value)}
          placeholder="Ürünün Fotoğrafının adresi"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Ürün Fiyatı"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          value={stockAmount}
          onChange={(e) => setStockAmount(e.target.value)}
          placeholder="Ürün Stok Adedi"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Ürün Açıklaması"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <select
          value={genderId}
          onChange={(e) => setGenderId(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Cinsiyet Seç
          </option>
          {genderList.map((gender) => (
            <option key={gender.genderId} value={gender.genderId}>
              {gender.genderName}
            </option>
          ))}
        </select>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Kategori Seç
          </option>
          {categoryList.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <select
          value={volumeId}
          onChange={(e) => setVolumeId(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Boyut Seç
          </option>
          {volumeList.map((volume) => (
            <option key={volume.volumeId} value={volume.volumeId}>
              {volume.volume}
            </option>
          ))}
        </select>
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Kategori Seç
          </option>
          {brandList.map((brand) => (
            <option key={brand.brandId} value={brand.brandId}>
              {brand.brandName}
            </option>
          ))}
        </select>
        <select
          value={productIsBestSeller}
          onChange={(e) => setProductIsBestSeller(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Best Seller mi
          </option>
          <option value={true}>Evet</option>
          <option value={false}>Hayır</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Ekle
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
