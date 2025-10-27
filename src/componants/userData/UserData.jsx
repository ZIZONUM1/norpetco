import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar"; // للغة العربية
import LoadingScreen from "../Loadingscreen/Loadingscreen";
import { useAuth } from "../../contexts/AuthContexts";
import { jwtDecode } from "jwt-decode";
import { statisticsAPI } from "../../configs/apis";
import { Power } from "lucide-react";
registerLocale("ar", ar);
export default function UserData() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {token,logout,userData } = useAuth();
  
  const [userDataArr , setUserDataArr] = useState(null);

  const getUserStatistics = async()=>{
    try {
      const decoadedToken = jwtDecode(token);
      const {id} = decoadedToken;
      console.log(statisticsAPI);
      console.log(id);
      console.log(userData);
      
      const data = await statisticsAPI.getStatistics(userData.stafManNumber);
      console.log(data);
        
      setUserDataArr(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const filterFunction = () => {
    const filterd = userDataArr?.find((item)=>{
      return new Date(item["الشهر"]).getMonth() ===  new Date(selectedDate).getMonth() && 
      new Date(item["الشهر"]).getFullYear() ===  new Date(selectedDate).getFullYear()
    })
    console.log(filterd);
  }
 useEffect(()=>{
  getUserStatistics();
 },[])

 useEffect(()=>{
  filterFunction();
 },[selectedDate])
 
  return (
    <>
      {userDataArr && userDataArr.length !== 0?<div
        dir="rtl"
        className="min-h-screen py-8 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-gray-200"
      >
        <div className="w-[90%] bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl px-8 py-10 sm:px-12 sm:py-16 flex flex-col justify-between max-w-6xl mx-auto text-right font-sans relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-6">
            <div className="order-2 sm:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                أهلاً بك، {userDataArr[0]["إســــــم العــــــامل"]}
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
 {/* <label className="text-gray-700 font-semibold">اختر الشهر والسنة</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker   
        locale="ar"
        className="border border-gray-300 rounded-lg px-4 py-2 text-right w-48 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        calendarClassName="!rtl text-right"
      /> */}
            <div className="flex flex-col gap-4">

    <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">إســــــم العــــــامل: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["إســــــم العــــــامل"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">المرتب الأساسى: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["المرتب الأساسى"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">حافز خبرة: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["حافز خبرة"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">حافز الإنتاج: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["حافز الإنتاج"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل تمثيل: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل تمثيل"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل وجبات: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل وجبات"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل إنتقالات: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل إنتقالات"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">حافز شهرى ثابت: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["حافز شهرى ثابت"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل جراج: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل جراج"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل تخصص: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل تخصص"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">العلاوات الخاصة: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["العلاوات الخاصة"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">علاوة غلاء معيشة: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["علاوة غلاء معيشة"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">منحة عيد العمال: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["منحة عيد العمال"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">أجر إضافى: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["أجر إضافى"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل صحراء: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل صحراء"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل وردية: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل وردية"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل تفرغ: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل تفرغ"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل حفر: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل حفر"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل إغتراب: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل إغتراب"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل صرافة: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل صرافة"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">إيرادات أخرى خاضعة: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["إيرادات أخرى خاضعة"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل مخاطر: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل مخاطر"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل موبايل: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل موبايل"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-gray-600">بدل وردية: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["بدل وردية"]}</p>
              </div>
               <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-red-600">إجمالى الإستقطاعات: </p>
                <p className="font-semibold text-xl">{userDataArr[0]["إجمالى الإستقطاعات"]}</p>
              </div>
              <div  className="bg-gray-50 p-4 rounded-lg text-center shadow-sm flex justify-between ">
                <p className="text-red-600">صافى الدخل</p>
                <p className="font-semibold text-xl">{userDataArr[0]["صافى الدخل"]}</p>
              </div>

          

            </div>
          </div>

          
          <div className="flex justify-start mt-8 text-gray-700 text-lg sm:text-xl">
            <span>آخر دفعة:</span>
            <span className="mr-2 font-semibold">٣٠ سبتمبر</span>
            <button
            onClick={logout}
            className="absolute top-3 left-3 border ml-3 border-red-600 flex items-center gap-x-2 z-10 px-6 py-2 rounded-xl font-medium text-red-600 cursor-pointer transition duration-300 hover:bg-red-600 hover:text-white"
          >
            <span>تسجيل الخروج</span>
            <Power size={18} />
          </button>
          </div>
        </div>
      </div>:<LoadingScreen/>}
    </>
  );
}
