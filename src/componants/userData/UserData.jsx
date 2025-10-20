import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar"; // للغة العربية
import LoadingScreen from "../Loadingscreen/Loadingscreen";
registerLocale("ar", ar);
export default function UserData() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const salaryDetails = [
  { title: "الراتب الأساسي", value: "٥٬٨٠٠" },
  { title: "البدلات", value: "١٬٠٠٠" },
  { title: "الخصومات", value: "٢٠٠" },
  { title: "صافي الراتب", value: "٦٬٦٠٠" },
    
];
 
 
  return (
    <>
      {salaryDetails?<div
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-gray-200"
      >
        <div className="w-[90%] min-h-[85vh] bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 sm:p-12 flex flex-col justify-between max-w-6xl mx-auto text-right font-sans">
          
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-6">
            <div className="order-2 sm:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                أهلاً بك، هاني عبدالعزيز
              </h2>
              <p className="text-gray-600 text-lg leading-tight">محاسب</p>
              <p className="text-gray-600 text-lg">قسم المالية</p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="order-1 sm:order-2 w-28 h-28 rounded-full bg-gray-100 p-2 mx-auto sm:mx-0"
            />
          </div>

          
          <hr className="my-6 border-gray-200" />

          
          <div className="flex-grow">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              تفاصيل الراتب
            </h3>
 <label className="text-gray-700 font-semibold">اختر الشهر والسنة</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker   // 👈 يظهر فقط الشهر والسنة
        locale="ar"
        className="border border-gray-300 rounded-lg px-4 py-2 text-right w-48 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        calendarClassName="!rtl text-right"
      />
            <div className="flex flex-col gap-4">
{salaryDetails.map((detail, index) => (
    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">{detail.title}</p>
                <p className="font-semibold text-xl">{detail.value}</p>
              </div>
))}            

            </div>
          </div>

          
          <div className="flex justify-start mt-8 text-gray-700 text-lg sm:text-xl">
            <span>آخر دفعة:</span>
            <span className="mr-2 font-semibold">٣٠ سبتمبر</span>
          </div>
        </div>
      </div>:<LoadingScreen/>}
    </>
  );
}
