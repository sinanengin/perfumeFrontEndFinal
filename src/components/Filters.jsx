import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import axios from "axios";
import {
  categoryUrl,
  subCategoryUrlByCategoryId,
  subcategoryUrl,
} from "../urls";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([]);
  const [selectGenderList, setSelectGenderList] = useState([]);
  const [selectBrandList, setSelectBrandList] = useState([]);
  const [selectVolumeList, setSelectVolumeList] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios("http://localhost:8080/api/categories");
      const data = response.data.data;
      console.log(data);
      setSelectCategoryList(data);
    };
    const fetchBrand = async () => {
      const response = await axios("http://localhost:8080/api/brands");
      const data = response.data.data;
      console.log(data);
      setSelectBrandList(data);
    };
    const fetchGender = async () => {
      const response = await axios("http://localhost:8080/api/genders");
      const data = response.data.data;
      console.log(data);
      setSelectGenderList(data);
    };
    const fetchVolume = async () => {
      const response = await axios("http://localhost:8080/api/volumes");
      const data = response.data.data;
      console.log(data);
      setSelectVolumeList(data);
    };
    fetchCategory();
    fetchVolume();
    fetchGender();
    fetchBrand();
  }, []);

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue=""
      />
      {/* CATEGORIES */}
      <div className="form-control">
        <label htmlFor="category" className="label">
          <span className="label-text capitalize">Kategori Seç</span>
        </label>
        <select
          name={"category"}
          id={"category"}
          className={`select select-bordered select-sm`}
        >
          {selectCategoryList.map((item) => {
            return (
              <option key={item.categoryId} value={item.categoryId}>
                {item.categoryName}
              </option>
            );
          })}
          <option key="" value="">
            Hepsi
          </option>
        </select>
      </div>

      {/* Brand */}
      <div className="form-control">
        <label htmlFor="brand" className="label">
          <span className="label-text capitalize">Marka Seç</span>
        </label>
        <select
          name={"brand"}
          id={"brand"}
          className={`select select-bordered select-sm`}
        >
          {selectBrandList.map((item) => {
            return (
              <option key={item.brandId} value={item.brandId}>
                {item.brandName}
              </option>
            );
          })}
          <option key="" value="">
            Hepsi
          </option>
        </select>
      </div>

      {/* Volume */}
      <div className="form-control">
        <label htmlFor="volume" className="label">
          <span className="label-text capitalize">Boyut Seç</span>
        </label>
        <select
          name={"volume"}
          id={"volume"}
          className={`select select-bordered select-sm`}
        >
          {selectVolumeList.map((item) => {
            return (
              <option key={item.volumeId} value={item.volumeId}>
                {item.volume}
              </option>
            );
          })}
          <option key="" value="">
            Hepsi
          </option>
        </select>
      </div>

      {/* Producer */}
      <div className="form-control">
        <label htmlFor="gender" className="label">
          <span className="label-text capitalize">select gender</span>
        </label>
        <select
          name={"gender"}
          id={"gender"}
          className={`select select-bordered select-sm`}
        >
          {selectGenderList.map((item) => {
            return (
              <option key={item.genderId} value={item.genderId}>
                {item.genderName}
              </option>
            );
          })}
          <option key="" value="">
            Hepsi
          </option>
        </select>
      </div>

      {/* BUTTONS */}

      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
      >
        Ara
      </button>
      <Link to="/shop?page=1" className="btn btn-primary btn-sm">
        Sıfırla
      </Link>
    </Form>
  );
};

export default Filters;
