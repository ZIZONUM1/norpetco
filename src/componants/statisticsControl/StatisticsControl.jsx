import { useState, useEffect } from "react";
import { Download, Search, Users, Wallet, TrendingUp, UserPlus } from "lucide-react";

export default function StatisticsControl() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const getUserStatistics = async () => {
    try {
      const decoadedToken = jwtDecode(token);
      const { id } = decoadedToken;
      const data = await statisticsAPI.getStatistics(userData.stafManNumber);
      setUserDataArr(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch data from backend API
 useEffect(() => {
     
 },[]);

  // Calculations
  const totalSalaries = employees.reduce((sum, e) => sum + (e.basic || 0), 0);
  const highestSalary = Math.max(...employees.map((e) => e.basic || 0), 0);
  const avgSalary = employees.length > 0 ? Math.round(totalSalaries / employees.length) : 0;
  const newEmployees = employees.filter((e) => e.isNew).length || 0; // dynamic example

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center space-y-6">
      {/* Statistics Boxes */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow flex flex-col items-center justify-center space-y-2">
          <TrendingUp size={24} className="text-blue-500" />
          <h3 className="text-gray-600 text-sm">أعلى راتب</h3>
          <p className="text-xl font-semibold text-gray-800">{highestSalary.toLocaleString()}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow flex flex-col items-center justify-center space-y-2">
          <Wallet size={24} className="text-green-500" />
          <h3 className="text-gray-600 text-sm">متوسط الراتب</h3>
          <p className="text-xl font-semibold text-gray-800">{avgSalary.toLocaleString()}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow flex flex-col items-center justify-center space-y-2">
          <UserPlus size={24} className="text-purple-500" />
          <h3 className="text-gray-600 text-sm">الموظفين الجدد</h3>
          <p className="text-xl font-semibold text-gray-800">{newEmployees}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow flex flex-col items-center justify-center space-y-2">
          <Users size={24} className="text-orange-500" />
          <h3 className="text-gray-600 text-sm">إجمالي الرواتب</h3>
          <p className="text-xl font-semibold text-gray-800">{totalSalaries.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Table Section */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-6 space-y-6 mt-4">
        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute right-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="إمارة جهة المدفوع"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pr-10 pl-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 text-sm hover:bg-gray-50 transition">
            <Download size={18} /> Excel
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-6">جارٍ تحميل البيانات...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-6">{error}</p>
          ) : filteredEmployees.length === 0 ? (
            <p className="text-center text-gray-500 py-6">لا توجد بيانات مطابقة للبحث</p>
          ) : (
            <table className="w-full text-right border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-600 text-sm border-b">
                  <th className="p-3">النوع</th>
                  <th className="p-3">القسم</th>
                  <th className="p-3">البدلات</th>
                  <th className="p-3">الخصومات</th>
                  <th className="p-3">البدلات</th>
                  <th className="p-3">الأساس</th>
                  <th className="p-3">الاسم</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, idx) => (
                  <tr key={idx} className="bg-gray-50 hover:bg-gray-100 transition rounded-xl">
                    <td className="p-3">{emp.date || "-"}</td>
                    <td className="p-3">{emp.department || "-"}</td>
                    <td className="p-3">{emp.allowances?.toLocaleString() || 0}</td>
                    <td className="p-3">{emp.deductions?.toLocaleString() || 0}</td>
                    <td className="p-3">{emp.bonuses?.toLocaleString() || 0}</td>
                    <td className="p-3">{emp.basic?.toLocaleString() || 0}</td>
                    <td className="p-3 font-medium">{emp.name || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
