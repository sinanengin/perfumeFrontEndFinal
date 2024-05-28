import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import { nanoid } from "nanoid";
import axios from "axios";
import { productCommentsUrl, userQuestionAddUrl } from "../urls";
import { toast } from "react-toastify";

const SingleProductReviews = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchComment = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/userComments/product" + `/${productId}`
      );
      console.log(productCommentsUrl + `/${productId}`);
      console.log(response.data);
      setComments(response.data.data);
    };

    fetchComment();
  }, []);

  const handleQuestionText = (event) => {
    setQuestionText(event.target.value);
  };

  const addQuestion = async () => {
    if (userData) {
      const question = {
        questionText: questionText,
        user: {
          userId: userData.user.userId,
        },
        product: {
          productId: productId,
        },
        answered: false,
      };
      const response = await axios.post(
        "http://localhost:8080/api/userQuestions",
        question
      );
      console.log(response);
    } else {
      toast.error(
        "Ürün hakkında soru sormak için lütfen öncelikle giriş yapınız"
      );
    }
  };

  return (
    <div className="product-reviews max-w-7xl mt-10 mx-auto">
      {/* <RatingPercentage rating={rating} productData={product} /> */}
      <div className="product-reviews-comments mt-20 px-10">
        <h2 className="text-4xl text-accent-content text-center mb-5 max-sm:text-2xl">
          Reviews
        </h2>
        {comments.map((item) => (
          <SingleReview key={nanoid()} reviewObj={item} />
        ))}
        <div className="form-control">
          <label htmlFor="addQuestion" className="label">
            <span className="label-text capitalize">
              Ürün Hakkında Soru Sor
            </span>
          </label>
          <input
            type="text"
            name="addComment"
            className={`input input-bordered input-lg`}
            placeholder="Buraya yaz"
            onChange={handleQuestionText}
          />
        </div>
        <button
          className="btn bg-blue-600 hover:bg-blue-500 w-full text-white"
          onClick={addQuestion}
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default SingleProductReviews;
