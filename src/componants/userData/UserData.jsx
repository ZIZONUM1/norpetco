import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
import LoadingScreen from "../Loadingscreen/Loadingscreen";
import { useAuth } from "../../contexts/AuthContexts";
import { jwtDecode } from "jwt-decode";
import { statisticsAPI } from "../../configs/apis";
import { Power } from "lucide-react";

registerLocale("ar", ar);

export default function UserData() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { token, logout, userData } = useAuth();
  const [userDataArr, setUserDataArr] = useState(null);

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

  const filterFunction = () => {
    const filterd = userDataArr?.find((item) => {
      return (
        new Date(item["الشهر"]).getMonth() ===
          new Date(selectedDate).getMonth() &&
        new Date(item["الشهر"]).getFullYear() ===
          new Date(selectedDate).getFullYear()
      );
    });
    console.log(filterd);
  };

  useEffect(() => {
    getUserStatistics();
  }, []);

  useEffect(() => {
    filterFunction();
  }, [selectedDate]);

  // 🔹 الحقول الخاصة بالقسط
  const qestFields = [
    "إجمالى الإستقطاعات",
    "إستقطاعات أخرى خاضعه",
    "إستقطاعات خاضعه",
    "مرضى وبدون أجر",
    "إستقطاعات قانون 4 لسنة 2021",
    "موبايل",
    "المعاش التكميلى",
    "إجمالى الأقساط",
    "إشتراك علاج عائلى",
    "دعم ص. الإسكان",
    "نقابة وصندوق زمالة",
    "مكافأة نهاية الخدمة",
    "تأمينات مدة سابقة",
    "ضريبة المرتبات",
  ];

  // 🔹 ترتيب البنود كما طلبت
  const order = [
    "المرتب الأساسى",
    "حافز خبرة",
    "حافز الإنتاج",
    "بدل تمثيل",
    "بدل وجبات",
    "بدل إنتقالات",
    "حافز شهرى ثابت",
    "بدل جراج",
    "بدل تخصص",
    "العلاوات الخاصة",
    "علاوة غلاء معيشة",
    "منحة عيد العمال",
    "أجر إضافى",
    "بدل صحراء",
    "بدل وردية",
    "بدل تفرغ",
    "بدل حفر",
    "بدل إغتراب",
    "بدل صرافة",
    "إيرادات أخرى خاضعة",
    "بدل مخاطر",
    "بدل موبايل",
    "بدل طبيعة عمل",
    "بدلات خاضعة",
    "إجمالى الدخل",
    "ضريبة المرتبات",
    "تأمينات مدة سابقة",
    "مكافأة نهاية الخدمة",
    "نقابة وصندوق زمالة",
    "دعم ص. الإسكان",
    "إشتراك علاج عائلى",
    "إجمالى الأقساط",
    "المعاش التكميلى",
    "إشتراك العامل فى التأمينات الإجتماعية",
    "موبايل",
    "إستقطاعات قانون 4 لسنة 2021",
    "مرضى وبدون أجر",
    "إستقطاعات خاضعه",
    "إستقطاعات أخرى خاضعه",
    "إجمالى الإستقطاعات",
    "صافى الدخل",
  ];

  return (
    <>
      {userDataArr && userDataArr.length !== 0 ? (
        <div
          dir="rtl"
          className="min-h-screen py-8 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-gray-200"
        >
          <div className="w-[95%] md:w-[90%] bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl px-6 md:px-10 py-8 md:py-14 flex flex-col justify-between max-w-6xl mx-auto text-right font-sans relative overflow-hidden">
            {/* زر تسجيل الخروج */}
            <button
              onClick={logout}
              className="absolute  top-3 left-3 border ml-3 border-red-600 flex items-center gap-x-2 z-10 px-4 md:px-6 py-2 rounded-xl font-medium text-red-600 cursor-pointer transition duration-300 hover:bg-red-600 hover:text-white"
            >
              <span>تسجيل الخروج</span>
              <Power size={18} />
            </button>

            {/* ===== بطاقة بيانات العامل ===== */}
            <div className="bg-gradient-to-l from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl shadow-md p-5 md:p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-right">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {userDataArr[0]["إســــــم العــــــامل"]}
                </h2>
                <p className="text-gray-700 text-base md:text-lg">
                  رقم العامل:{" "}
                  <span className="font-semibold text-gray-900">
                    {userDataArr[0]["رقم العامل"]}
                  </span>
               
                </p>
                   <span className="font-semibold text-gray-900">
                   محاسب
                  </span>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="profile"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 p-2 shadow"
              />
            </div>

            <hr className="my-6 border-gray-200" />

            {/* ===== تفاصيل الراتب ===== */}
            <div className="flex-grow overflow-x-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                تفاصيل الراتب
              </h3>

              {/* ===== جدول الراتب ===== */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-300 rounded-2xl shadow-md overflow-hidden text-sm md:text-base">
                  <thead className="bg-yellow-100 text-gray-800 font-bold">
                    <tr>
                      <th className="border border-gray-300 px-3 md:px-4 py-3 whitespace-nowrap">
                        البند
                      </th>
                      <th className="border border-gray-300 px-3 md:px-4 py-3 whitespace-nowrap w-auto">
                        القيمة
                      </th>
                      <th className="border border-gray-300 px-3 md:px-4 py-3 whitespace-nowrap w-auto">
                        القسط
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-700">
                    {Object.entries(userDataArr[0])
                      .sort(([aKey], [bKey]) => {
                        const aIndex = order.indexOf(aKey);
                        const bIndex = order.indexOf(bKey);
                        if (aIndex === -1 && bIndex === -1) return 0;
                        if (aIndex === -1) return 1;
                        if (bIndex === -1) return -1;
                        return aIndex - bIndex;
                      })
                      .map(([key, value], index) => {
                        if (
                          key === "إســــــم العــــــامل" ||
                          key === "رقم العامل" ||
                          key === "الشهر" ||
                          ["_id", "__v", "createdAt", "updatedAt", "دعم ص"].includes(
                            key
                          )
                        )
                          return null;

                        const isTotal =
                          key.includes("إجمالى") || key.includes("صافى");

                        const displayValue =
                          typeof value === "object"
                            ? Object.entries(value)
                                .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                                .join(" | ")
                            : value;

                        const isQest = qestFields.some((f) => key.includes(f));

                        return (
                          <tr
                            key={index}
                            className={`${
                              isTotal
                                ? "bg-red-50 text-red-600 font-bold"
                                : index % 2 === 0
                                ? "bg-white"
                                : "bg-gray-50"
                            }`}
                          >
                            <td className="border border-gray-300 px-3 md:px-4 py-3 font-medium whitespace-nowrap">
                              {key}
                            </td>

                            {/* عمود القيمة */}
                            <td className="border border-gray-300 px-3 md:px-4 py-3 text-center align-middle">
                              {!isQest ? displayValue : "-"}
                            </td>

                            {/* عمود القسط */}
                            <td className="border border-gray-300 px-3 md:px-4 py-3 text-center align-middle">
                              {isQest ? displayValue : "-"}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== أسفل الصفحة ===== */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-gray-700 text-base md:text-lg">
              <div>
                <span>آخر دفعة:</span>
                <span className="mr-2 font-semibold">٣٠ سبتمبر</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
