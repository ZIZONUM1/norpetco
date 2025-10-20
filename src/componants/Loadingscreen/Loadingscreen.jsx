import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-gray-200">
      
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-4 border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
      </div>

    </div>
  );
}
