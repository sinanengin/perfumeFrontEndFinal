import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OrderHistory = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const customer = JSON.parse(localStorage.getItem("customer"));
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const getOrderHistory = async () => {
    console.log(`http://localhost:8080/api/orders/user/${user.user.userId}`);
    const response = await axios.get(
      `http://localhost:8080/api/orders/user/${user.user.userId}`
    );
    const data = response.data.data;
    console.log(response.data.data);
    setOrders(data);
  };

  useEffect(() => {
    if (!user) {
      toast.error("Bu ekranı açmak için öncelikle giriş yapmalısınız");
      navigate("/");
    }
    getOrderHistory();
  }, []);

  const handleCommentText = (event) => {
    setCommentText(event.target.value);
  };

  const addComment = async (product) => {
    const comment = {
      commentText: commentText,
      rating: rating,
      user: {
        userId: user.user.userId,
      },
      product: {
        productId: product.productId,
      },
      date: getFormattedDate(),
    };

    console.log(comment);

    const addResponse = await axios.post(
      "http://localhost:8080/api/userComments",
      comment
    );

    console.log(addResponse.data);
  };

  function getFormattedDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Aylar 0'dan başlar, bu yüzden 1 eklenir
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <SectionTitle title="Order History" path="Home | Order History" />
      <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-10">
        {orders?.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl text-accent-content">
              Henüz Siparişiniz Bulunmamaktadır.
            </h1>
            <Link
              to="/shop"
              className="btn bg-blue-600 hover:bg-blue-500 text-white mt-10"
            >
              İlk siparişinizi yapın.
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            return (
              <div
                key={order.orderId}
                className="collapse collapse-plus bg-base-200 mb-2"
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium text-accent-content">
                  Sipariş {order.orderId}
                </div>
                <div className="collapse-content">
                  <div className="overflow-x-auto">
                    <table className="table max-sm:table-xs table-pin-rows table-pin-cols">
                      {/* head */}
                      <thead>
                        <tr className="text-accent-content">
                          <th>Ürün</th>
                          <th>Ürün İsmi</th>
                          <th>Fiyatı</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-accent-content" key={order.orderId}>
                          <th>
                            <img
                              src={order.product.productImgUrl}
                              alt=""
                              className="w-10"
                            />
                          </th>
                          <td>{order.product.productName}</td>
                          <td>${order.product.productPrice}</td>
                        </tr>
                      </tbody>
                      <div className="form-control">
                        <label htmlFor="addComment" className="label">
                          <span className="label-text capitalize">
                            Ürün Hakkında Yorum Yap
                          </span>
                        </label>
                        <input
                          type="text"
                          name="addComment"
                          className={`input input-bordered input-lg`}
                          placeholder="Buraya yaz"
                          onChange={handleCommentText}
                        />
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={`w-10 h-10 text-3xl ${
                                index <= (hover || rating)
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              }`}
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setHover(index)}
                              onMouseLeave={() => setHover(rating)}
                            >
                              <span className="star">&#9733;</span>
                            </button>
                          );
                        })}
                        <p className="ml-4 text-lg">Rating: {rating}</p>
                      </div>
                      <button
                        className="btn bg-blue-600 hover:bg-blue-500 w-full text-white"
                        onClick={() => {
                          addComment(order.product);
                        }}
                      >
                        Gönder
                      </button>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default OrderHistory;
