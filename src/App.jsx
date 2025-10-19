
import './App.css'
import logo from "./assets/1760778975945.png"
function App() {
  

  return (
    <>
    <div className="relative min-h-screen">  
      <div className="absolute inset-0 backdrop-blur-lg bg-white/10 z-0"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <form className="bg-white/80 p-6 sm:p-8 rounded-xl shadow-lg w-11/12 sm:w-96 md:w-[28rem] lg:w-[32rem] max-w-full">
  <img src={logo} alt="logo" className="w-52 sm:w-52 mx-auto mb-4" />
  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
    <span className="text-yellow-400">NORPETCO</span> ENTRANET
  </h2>

  <input
    type="text"
    placeholder="User Name "
    className="w-full p-2 mb-3 rounded-md border border-gray-300 focus:outline-none"
  />
  <input
    type="password"
    placeholder="Password"
    className="w-full p-2 mb-3 rounded-md border border-gray-300 focus:outline-none"
  />
  <button className="w-full bg-yellow-400 cursor-pointer text-gray-800 font-semibold py-2 rounded-md hover:bg-yellow-500">
    Login
  </button>
</form>
      </div>
    </div>
    </>
  )
}

export default App
