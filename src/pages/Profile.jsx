import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [customerFormData, setCustomerFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    user: {
      userId: user.user.userId,
    },
  });
  const navigate = useNavigate();

  const getUserQuestion = async () => {
    const questionResponse = await axios.get(
      `http://localhost:8080/api/userQuestions/user/${user.user.userId}`
    );
    console.log(
      `http://localhost:8080/api/userQuestions/user/${user.user.userId}`
    );
    setQuestions(questionResponse.data.data);
    console.log(questionResponse.data);
  };

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }

    getUserQuestion();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const getResponse = await axios.get(
        `http://localhost:8080/api/customers/${user.user.userId}`
      );
      console.log(getResponse.data.data.customerId);
      if (getResponse.data.data === null) {
        const addResponse = await axios.post(
          "http://localhost:8080/api/customers",
          {
            firstName: customerFormData.firstName,
            lastName: customerFormData.lastName,
            address: customerFormData.address,
            phone: customerFormData.phone,
            user: {
              userId: user.user.userId,
            },
          }
        );
        console.log(addResponse.data.status);
      } else {
        console.log(customerFormData);
        const putResponse = await axios.put(
          `http://localhost:8080/api/customers`,
          {
            customerId: getResponse.data.data.customerId,
            firstName: customerFormData.firstName,
            lastName: customerFormData.lastName,
            address: customerFormData.address,
            phone: customerFormData.phone,
            user: {
              userId: user.user.userId,
            },
          }
        );
        const putData = putResponse.data;
        console.log(putData);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <SectionTitle
        title="Kullanıcı Profili"
        path="Anasayfa | Kullanıcı Profili"
      />
      <form
        className="max-w-7xl mx-auto text-center px-10"
        onSubmit={updateProfile}
      >
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Adınız</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={customerFormData.firstName}
              onChange={(e) => {
                setCustomerFormData({
                  ...customerFormData,
                  firstName: e.target.value,
                });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Soyadınız</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={customerFormData.lastName}
              onChange={(e) => {
                setCustomerFormData({
                  ...customerFormData,
                  lastName: e.target.value,
                });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Telefon Numaranız</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={customerFormData.phone}
              onChange={(e) => {
                setCustomerFormData({
                  ...customerFormData,
                  phone: e.target.value,
                });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Adresiniz</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={customerFormData.address}
              onChange={(e) => {
                setCustomerFormData({
                  ...customerFormData,
                  address: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Profili Güncelle
        </button>
        {questions.map((question) => (
          <article className="mb-10">
            <div className="flex items-center mb-4">
              <div className="font-medium dark:text-white">
                <p>{question.user.username}</p>
              </div>
            </div>
            <p className="mb-2 text-accent-content">{question.questionText}</p>
            <div className="font-medium dark:text-white">
              <p>Cevaplar</p>
            </div>
            {question.answered === true ? (
              question.answers.map((answer) => (
                <p className="mb-2 text-accent-content">{answer.answerText}</p>
              ))
            ) : (
              <p className="mb-2 text-accent-content">
                Henüz Sorunuz Cevaplanmadı
              </p>
            )}
          </article>
        ))}
      </form>
    </>
  );
};

export default Profile;
