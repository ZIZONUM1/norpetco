import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/1760778975945.png";
import { toast } from "react-toastify";

import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../configs/apis";
import { useAuth } from "../../contexts/AuthContexts";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    user_Name: Yup.string().required("اسم المستخدم مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      user_Name: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await authAPI.login(values);
        // ✅ خزّن البيانات
        login(res.token , res.data);
        toast.success("success ✔")
      } catch (err) {
        toast.error(err.response?.data?.message || "❌ فشل التسجيل");
                console.error("❌ خطأ أثناء تسجيل الدخول:", err);

      }
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 backdrop-blur-lg bg-white/10 z-0"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 p-6 sm:p-8 rounded-xl shadow-lg w-11/12 sm:w-96 md:w-[28rem] lg:w-[32rem] max-w-full"
        >
          {/* Logo */}
          <img src={logo} alt="logo" className="w-52 sm:w-52 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
            تسجيل الدخول
          </h2>

          {/* ✅ Error Message */}
       
    
          {/* user_Name */}
          <input
            type="text"
            name="user_Name"
            placeholder="اسم المستخدم"
            value={values.user_Name}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
          />
          {touched.user_Name && errors.user_Name && (
            <div className="text-red-500 text-sm mb-2">{errors.user_Name}</div>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={values.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
          />
          {touched.password && errors.password && (
            <div className="text-red-500 text-sm mb-2">{errors.password}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 cursor-pointer text-gray-800 font-semibold py-2 rounded-md hover:bg-yellow-500 transition-all"
          >
            تسجيل الدخول
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default Login;
