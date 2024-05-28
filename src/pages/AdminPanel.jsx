import React, { useEffect } from "react";
import { ProductForm, ProductList, UserQuestions } from "../components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
    if (user === null) {
      navigate("/");
    }
    if (user.claims.length > 0) {
      if (user.claims[0].permissionName !== "admin") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      console.log(response.data.data.content);
      setProducts(response.data.data.content);
    } catch (error) {
      console.error("Ürünleri getirirken hata oluştu:", error);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  useState(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-8">Admin Panel</h1>

        <ProductForm onProductAdded={handleProductAdded} />
        <ProductList products={products} />
        <UserQuestions />
      </div>
    </div>
  );
};

export default AdminPanel;
