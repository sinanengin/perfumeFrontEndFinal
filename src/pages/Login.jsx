import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      localStorage.clear();
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;

    if (email.length === 0) {
      isProceed = false;
      toast.warn("Lütfen bir eposta girin");
    } else if (password.length < 4) {
      isProceed = false;
      toast.warn("Şifre en az 4 karakterden oluşmalıdır");
    }
    return isProceed;
  };

  const login = async () => {
    if (isValidate()) {
      const user = {
        email: email,
        password: password,
      };
      console.log(user);
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        const claims = responseJson.data.claims;
        let adminClaim = claims.find(
          (claim) => claim.permissionName === "admin"
        );
        if (!adminClaim) {
          toast.success("Giriş Başarılı");
          localStorage.setItem("user", JSON.stringify(responseJson.data));
          const customerResponse = await axios.get(
            "http://localhost:8080/api/customers/" +
              responseJson.data.user.userId
          );
          localStorage.setItem(
            "customer",
            JSON.stringify(customerResponse.data.data)
          );
          navigate("/");
        } else {
          localStorage.setItem("user", JSON.stringify(responseJson.data));
          navigate("/admin-panel");
        }
      } else {
        toast.warn("Eposta veya şifre hatalı");
      }
    }
  };

  return (
    <>
      <SectionTitle title="Login" path="Home | Login" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <label className="font-semibold text-sm pb-1 block text-accent-content">
              E-Posta
            </label>
            <input
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm pb-1 block text-accent-content">
              Şifre
            </label>
            <input
              type="password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              onClick={login}
            >
              <span className="inline-block mr-2">Giriş Yap</span>
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
          </div>
          <div className="py-5 text-center">
            <Link
              to="/register"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              Don't have an account? Please register.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
