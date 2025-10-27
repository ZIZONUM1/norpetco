import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/1760778975945.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI } from "../../configs/apis";
import { systemRoles } from "../../utils/systemRoles";
import { useAuth } from "../../contexts/AuthContexts";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const formik = useFormik({
    initialValues: { user_Name: "", nationalID: "", password: "", role: systemRoles.EMPLOYEE },
    validationSchema: Yup.object({
      user_Name: Yup.string().required("اسم المستخدم مطلوب"),
      nationalID: Yup.string()
        .matches(/^\d{11}$/, "الرقم القومي يجب أن يكون 11 أرقام")
        .required("الرقم القومي مطلوب"),
      password: Yup.string()
        .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
        .required("كلمة المرور مطلوبة"),
      role: Yup.string().oneOf([systemRoles.ADMIN, systemRoles.EMPLOYEE]).required("الدور مطلوب").default(systemRoles.EMPLOYEE),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = await authAPI.signup(values);
        toast.success("تم التسجيل بنجاح 🎉");
        login(data.token , data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "❌ فشل التسجيل");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 backdrop-blur-lg bg-white/10 z-0"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white/80 p-6 sm:p-8 rounded-xl shadow-lg w-11/12 sm:w-96 md:w-[28rem] lg:w-[32rem] max-w-full"
        >
          <img src={logo} alt="logo" className="w-52 sm:w-52 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
            إنشاء حساب جديد
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-0 gap-6">
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
            >
              <option value={systemRoles.ADMIN}>أدمن</option>
              <option value={systemRoles.EMPLOYEE}>موظف</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm mb-2">
                {formik.errors.role}
              </div>
            )}
          </div>
          <input
            type="text"
            name="user_Name"
            placeholder="اسم المستخدم"
            value={formik.values.user_Name}
            onChange={formik.handleChange}
            className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
          />
          {formik.touched.user_Name && formik.errors.user_Name && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.user_Name}
            </div>
          )}

          <input
            type="text"
            name="nationalID"
            placeholder="الرقم القومي"
            value={formik.values.nationalID}
            onChange={formik.handleChange}
            className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
          />
          {formik.touched.nationalID && formik.errors.nationalID && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.nationalID}
            </div>
          )}

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.password}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 cursor-pointer text-gray-800 font-semibold py-2 rounded-md hover:bg-yellow-500"
          >
            {loading ? "جارٍ التسجيل..." : "تسجيل"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-700">
            لديك حساب بالفعل؟{" "}
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-600 font-semibold"
            >
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
