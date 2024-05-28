/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const filterObj = {
    brand: params.brand ?? "",
    category: params.category ?? "",
    gender: params.gender ?? "",
    volume: params.volume ?? "",
    search: params.search ?? "",
    current_page: Number(params.page) || 1,
  };

  // set params in get apis
  let parameter = "";
  if (filterObj.search !== "") {
    parameter += `/search/${filterObj.search}`;
  } else {
    parameter += `?volumeId=${filterObj.volume}&brandId=${
      filterObj.brand
    }&categoryId=${filterObj.category}&genderId=${
      filterObj.gender
    }&pageSize=5&pageNo=${filterObj.current_page - 1}`;
  }

  try {
    console.log(`http://localhost:8080/api/products${parameter}`);
    const response = await axios(
      `http://localhost:8080/api/products${parameter}`
    );
    let data = response.data.data;
    console.log(data.content);
    return {
      productsData: data.content,
      productsLength: data.content.length,
      page: filterObj.current_page,
    };
  } catch (error) {
    console.log(error.response);
  }

  return null;
};

const Shop = () => {
  const productLoaderData = useLoaderData();

  return (
    <>
      <SectionTitle title="Shop" path="Home | Shop" />
      <div className="max-w-7xl mx-auto mt-5">
        <Filters />
        {productLoaderData.productsData.length === 0 && (
          <h2 className="text-accent-content text-center text-4xl my-10">
            No products found for this filter
          </h2>
        )}
        <div className="grid grid-cols-4 px-2 gap-y-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <ProductElement
                key={product.productId}
                id={product.productId}
                title={product.productName}
                image={product.productImageUrl}
                price={product.productPrice}
                brandName={product.brand.brandName}
              />
            ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Shop;
