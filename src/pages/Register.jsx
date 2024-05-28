import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    //if (localStorage.getItem("user")) navigate("/");
  });

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (email.length === 0) {
      isProceed = false;
      errorMessage = "Lütfen E-postayı boş geçmeyiniz";
    } else if (username.length === 0) {
      isProceed = false;
      errorMessage = "Lütfen Şifreyi boş geçmeyiniz";
    } else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Lütfen en az 6 karakterli bir şifre giriniz";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Lütfen en az 6 karakterli bir şifre giriniz";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Şifreler eşleşmeli";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let regObj = {
      username,
      password,
      email,
    };

    if (isValidate()) {
      const registerResponse = await axios.post(
        "http://localhost:8080/api/register",
        regObj
      );

      if (registerResponse.data.success) {
        console.log(registerResponse.data.data);
        toast.success("Kayıt başarılı");
        navigate("/login");
      } else {
        toast.error("Kayıt mevcut");
      }
    }
  };
  return (
    <>
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                E-posta
              </label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Şifre
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Şifre Tekrar
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Kayıt Ol</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              Zaten Hesabın Var mı? Lütfen Giriş Yap.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
