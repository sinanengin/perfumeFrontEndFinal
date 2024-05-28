import axios from "axios";
import React, { useState } from "react";
import {
  QuantityInput,
  SectionTitle,
  SingleProductReviews,
} from "../components";
import { FaCartShopping } from "react-icons/fa6";

import { useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { productsUrl } from "../urls";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;

  const response = await axios("http://localhost:8080/api/products" + `/${id}`);

  return {
    productData: response.data.data,
  };
};

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const customer = JSON.parse(localStorage.getItem("customer"));

  const { productData } = useLoaderData();

  const product = {
    id: productData?.productId,
    title: productData?.prpdocutName,
    image: productData?.productImageUrl,
    price: productData?.productPrice,
    brandName: productData?.brand.brandName,
    categoryName: productData?.category.categoryName,
    volume: productData?.volume.volume,
    description: productData?.productDescription,
    gender: productData?.gender.genderName,
    stockAmount: productData?.stockAmount,
    amount: quantity,
  };

  function getFormattedDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Aylar 0'dan başlar, bu yüzden 1 eklenir
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const addOrder = async () => {
    const order = {
      orderDate: getFormattedDate(),
      user: {
        userId: user.user.userId,
      },
      product: {
        productId: product.id,
      },
    };
    console.log(order);
    const addOrderResponse = await axios.post(
      "http://localhost:8080/api/orders",
      order
    );

    console.log(addOrderResponse.data);
  };

  return (
    <>
      <SectionTitle title="Product page" path="Home | Shop | Product page" />
      <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
        <div className="product-images flex flex-col justify-center max-lg:justify-start">
          <img
            src={product.image}
            className="w-96 text-center border border-gray-600 cursor-pointer"
            alt={product.title}
          />
        </div>
        <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">
            {product.title}
          </h2>
          <p className="text-3xl text-error">${product.price}</p>
          <div className="text-xl max-sm:text-lg text-accent-content">
            {parse(product.description)}
          </div>
          <div>
            <label htmlFor="Quantity" className="sr-only">
              {" "}
              Quantity{" "}
            </label>
            <div className="flex items-center gap-1">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
          <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
            <button
              className="btn bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => {
                if (user) {
                  if (customer) {
                    addOrder();
                    toast.success("Ürün başarıyla satın alındı");
                  } else {
                    toast.error(
                      "satın alım yapmadan önce profil kısmından bilgilerinizi giriniz."
                    );
                  }
                } else {
                  toast.error("Ürünü Satın Almak için giriş yapmalısınız");
                }
              }}
            >
              <FaCartShopping className="text-xl mr-1" />
              Satın Al
            </button>
          </div>
          <div className="other-product-info flex flex-col gap-x-2">
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Marka: {product.brandName}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              {product.gender === -1 ? (
                <>Cinsiyet : Erkek</>
              ) : product.gender === 1 ? (
                <>Cinsiyet : Kadın</>
              ) : (
                <>Cinsiyet: Unisex</>
              )}
            </div>
            <div
              className={
                product.stockAmount > 0
                  ? "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
                  : "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
              }
            >
              Stokta Var Mı: {product.stockAmount > 0 ? "Evet" : "Hayır"}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Kategori: {product.categoryName}
            </div>
          </div>
        </div>
      </div>

      <SingleProductReviews productId={product.id} />
    </>
  );
};

export default SingleProduct;
