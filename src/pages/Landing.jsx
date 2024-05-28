import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const landingLoader = async () => {
  const response = await axios("http://localhost:8080/api/products/bestseller");
  const data = response.data.data.content;
  console.log(data);

  return { products: data };
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <Hero />
      <Stats />

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductElement
              key={product.starProductId}
              id={product.productId}
              title={product.productName}
              image={product.productImageUrl}
              price={product.productPrice}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
