import { Route, Routes } from "react-router-dom";
import { GuestRoute, UserRoute, AdminRoute } from "../componants/ProtectedRoutes/ProtectedRoutes";
import Login from "../componants/Login/Login";
import UserData from "../componants/userData/UserData";
import Register from "../componants/Register/Register";
import AdminLayout from "../componants/Layouts/AdminLayout";
import UsersForm from "../componants/Forms/UsersForm";
import StatisticsForm from "../componants/Forms/StatisticsForm";

const RouterComponent = () => {
  return (
    <>
      <Routes>
        {/* 🔹 Routes للضيوف */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 🔹 Routes للمستخدم العادي */}
        <Route element={<UserRoute />}>
          <Route path="/" element={<UserData />} />
        </Route>

        {/* 🔹 Routes للإدمن */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin-panel" element={<UsersForm/>} />
            <Route path="/admin-panel/national-ids" element={<UsersForm />} />
            <Route path="/admin-panel/statistics" element={<StatisticsForm />} />
          </Route>
        </Route>

        {/* صفحة 404 */}
        <Route path="*" element={<h1 className="text-center mt-10 text-3xl">404 - الصفحة غير موجودة</h1>} />
      </Routes>
    </>
  );
};

export default RouterComponent;
