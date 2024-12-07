import { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../assets/icons/ProfileIcon.svg";
import DropDownMenuByArrow from "../DropDownMenu/DropDownMenuByArrow";
import { MenuOutlined } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/icons/HomeIcon";
import MyProjects from "../../assets/icons/MyProjects";
import ReportIcon from "../../assets/icons/ReportsIcon";
import LogoutDialog from "../dialoge/LogoutDialog";

export default function AdminDashboardHeader({
  onChange,
  variant = "admin/home",
}) {
  const logoutRef = useRef();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const lightBlue = "#76ABAE";
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="relative bottom-8">
      <LogoutDialog dialogRef={logoutRef} />

      {/* Overlay for the background when the menu is open */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 bg-black opacity-60 z-20"
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {screenWidth < 600 ? (
        <div className="w-full flex flex-col">
          <p className="flex self-center m-4 text-white font-bold capitalize">
            {variant}
          </p>
          <header className="bg-brighterGray flex justify-start items-center mx-4 relative flex-col rounded-2xl z-30">
            <span className="flex flex-row justify-start items-center w-full">
              <span className="p-4">
                <MenuOutlined
                  className="cursor-pointer"
                  onClick={toggleMenu}
                  sx={{ color: "white" }}
                />
              </span>
            </span>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="mt-2 flex flex-col items-start rounded-lg shadow-lg z-30 w-full text-white"
                >
                  <p
                    onClick={() => navigate("/admin/home")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    Home
                  </p>
                  <p
                    onClick={() => navigate("/admin/users")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    View Users
                  </p>
                  <p
                    onClick={() => navigate("/admin/reports")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    View Reports
                  </p>
                  <p
                    onClick={() =>
                      navigate(`/profile/${localStorage.getItem("username")}`)
                    }
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => logoutRef.current.open()}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    Logout
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </header>
        </div>
      ) : (
        <header className="w-full bg-darkGray flex justify-start">
          <LogoutDialog dialogRef={logoutRef} />

          <div className="flex flex-row p-4 w-1/2 justify-start items-center">
            <ul className="flex">
              <li
                onClick={() => navigate("/admin/home")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <HomeIcon
                  fillColor={variant === "admin/home" ? lightBlue : "white"}
                  styles={"w-16 h-14"}
                />
                <h1
                  className={`m-2 ${
                    variant === "admin/home" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  Dashboard
                </h1>
              </li>
              <li
                onClick={() => navigate("/admin/users")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <MyProjects
                  fillColor={variant === "admin/users" ? lightBlue : "white"}
                  styles={"w-16 h-14"}
                />
                <h1
                  onClick={() => navigate("/admin/users")}
                  className={`m-2 ${
                    variant === "admin/users" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  View Users
                </h1>
              </li>
              <li
                onClick={() => navigate("/admin/reports")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <ReportIcon
                  fillColor={variant === "admin/reports" ? lightBlue : "white"}
                  styles={"w-16 h-14"}
                />
                <h1
                  className={`m-2 ${
                    variant === "admin/reports"
                      ? "text-lightBlue"
                      : "text-white"
                  }`}
                >
                  View Reports
                </h1>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center ml-auto">
            <DropDownMenuByArrow>
              <h1
                onClick={() =>
                  navigate(`/profile/${localStorage.getItem("username")}`)
                }
                className="p-4 rounded-lg cursor-pointer hover:bg-gray-200 delay-50 duration-75"
              >
                Profile
              </h1>
              <h1
                onClick={() => logoutRef.current.open()}
                className="p-4 rounded-lg hover:bg-gray-200 delay-50 duration-75 cursor-pointer"
              >
                Logout
              </h1>
            </DropDownMenuByArrow>
          </div>
        </header>
      )}
    </div>
  );
}
