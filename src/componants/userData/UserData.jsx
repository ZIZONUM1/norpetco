import React from 'react'

export default function UserData() {
  return<>
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-gray-200">
      <div className="w-[90%] min-h-[85vh] bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 sm:p-12 flex flex-col justify-between max-w-6xl mx-auto text-left font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome,Hany Abdelaziz</h2>
          <p className="text-gray-600 text-lg leading-tight">Accountant</p>
          <p className="text-gray-600 text-lg">Finance Department</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          className="w-28 h-28 rounded-full bg-gray-100 p-2 mx-auto sm:mx-0"
        />
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Salary Details */}
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Salary Details</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-600">Base Salary</p>
            <p className="font-semibold text-xl">5,800</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-600">Allowances</p>
            <p className="font-semibold text-xl">1,000</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-600">Deductions</p>
            <p className="font-semibold text-xl">200</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm font-bold">
            <p className="text-gray-800">Net Salary</p>
            <p className="text-2xl text-gray-900">6,600</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-8 text-gray-700 text-lg sm:text-xl">
        <span>Last Payment:</span>
        <span className="ml-2 font-semibold">September 30</span>
      </div>
    </div>
  
    </div>

    </>
  
}
