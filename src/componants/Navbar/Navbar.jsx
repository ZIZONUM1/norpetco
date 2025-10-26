import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, Power, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContexts";

const Navbar = () => {
  const [active, setActive] = useState("إدارة الموظفين");
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const { pathname } = useLocation();

  // ✅ Tabs خاصة بصفحة add-stuf فقط
  const tabs = [
    { title: "إدارة الموظفين", path: "/admin-panel/national-ids" },
    { title: "سجل الرواتب", path: "/admin-panel/statistics" },
  ];

  const handleTabClick = (title) => {
    setActive(title);
    setIsOpen(false);
  };

  const handlePathChange = useCallback(() => {
    const foundTab = tabs.find((tab) => pathname === tab.path);
    if (foundTab) setActive(foundTab.title);
  }, [pathname]);

  useEffect(() => {
    handlePathChange();
  }, [handlePathChange]);

  // ✅ نتحقق أن الصفحة الحالية هي add-stuf فقط
  if (!pathname.startsWith("/admin-panel")) return null;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Title */}
        <Link
          to="/admin-panel"
          className="text-xl font-bold text-blue-600"
          onClick={() => handleTabClick("إدارة الموظفين")}
        >
          لوحة تحكم الأدمن
        </Link>

        {/* Desktop Tabs */}
        <div className="hidden md:flex relative bg-gray-100 rounded-2xl p-2 shadow-inner">
          {tabs.map((tab, i) => (
            <Link
              to={tab.path}
              key={i}
              onClick={() => handleTabClick(tab.title)}
              className={`relative z-10 px-6 py-2 rounded-xl font-medium transition-colors duration-300 ${
                active === tab.title
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {active === tab.title && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-yellow-400 rounded-xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative">{tab.title}</span>
            </Link>
          ))}
          {/* Logout Button */}
          <button
            onClick={logout}
            className="relative border ml-3 border-red-600 flex items-center gap-x-2 z-10 px-6 py-2 rounded-xl font-medium text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
          >
            <span>تسجيل الخروج</span>
            <Power size={18} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center bg-gray-100 rounded-b-2xl shadow-inner pb-4"
          >
            {tabs.map((tab) => (
              <Link
                to={tab.path}
                key={tab.title}
                onClick={() => handleTabClick(tab.title)}
                className={`w-full text-center py-2 font-medium transition-colors duration-300 ${
                  active === tab.title
                    ? "text-blue-600 bg-blue-100"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.title}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="mt-2 w-11/12 border border-red-600 flex items-center justify-center gap-x-2 py-2 rounded-xl font-medium text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
            >
              <span>تسجيل الخروج</span>
              <Power size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
