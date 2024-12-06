import { useEffect, useRef, useState } from "react";
import appIcon from "../../assets/icons/mainIcon.svg";
import HomeIcon from "../../assets/icons/HomeIcon.jsx";
import MyProjects from "../../assets/icons/MyProjects.jsx";
// import ProfileIcon from "../../assets/icons/ProfileIcon.svg";
import InvitesIcon from "../../assets/icons/InvitesIcon.jsx";
import DropDownMenuByArrow from "../DropDownMenu/DropDownMenuByArrow";
import { MenuOutlined, Search } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextInput from "../input/TextInput";
import LogoutDialog from "../dialoge/LogoutDialog.jsx";

export default function HomeHeader({ onChange, variant = "home" }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const logoutRef = useRef();
  const lightBlue = "#76ABAE";
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
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
          <LogoutDialog dialogRef={logoutRef} />
          <p className="flex self-center m-4 text-white font-bold capitalize">
            {variant}
          </p>
          <header className="bg-brighterGray flex justify-center items-center mx-4 relative flex-col rounded-2xl z-30">
            <span className="flex flex-row justify-center items-center w-full">
              <span className="p-4 w-full">
                <TextInput onChange={onChange} placeholder="Search" />
              </span>
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
                    onClick={() => navigate("/home")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    Home
                  </p>
                  <p
                    onClick={() => navigate(`/profile/${username}/projects`)}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    My Projects
                  </p>
                  <p
                    onClick={() => navigate("/myInvites")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    Invites
                  </p>
                  <p
                    onClick={() => navigate(`/profile/${username}`)}
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
        <header className="w-full bg-darkGray flex justify-between">
          <LogoutDialog dialogRef={logoutRef} />

          <div className="flex flex-row p-4 w-1/2 justify-center items-center">
            <img className="w-16 h-14" src={appIcon} alt="App Icon" />
            <span className="w-full mx-4">
              <TextInput
                onChange={onChange}
                icon={<Search />}
                placeholder="Search"
              />
            </span>
          </div>
          <div className="flex justify-between">
            <ul className="flex">
              <li
                onClick={() => navigate("/home")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <HomeIcon
                  fillColor={variant === "home" ? lightBlue : "white"}
                  styles={"w-16 h-14"}
                />
                <h1
                  className={`m-2 ${
                    variant === "home" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  Home
                </h1>
              </li>
              <li
                onClick={() => navigate(`/profile/${username}/projects`)}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <MyProjects
                  fillColor={variant === "myProjects" ? lightBlue : "white"}
                  styles={"w-16 h-14"}
                />
                <h1
                  className={`m-2 ${
                    variant === "myProjects" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  My Projects
                </h1>
              </li>
              <li
                onClick={() => navigate("/myInvites")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <InvitesIcon
                  fillColor={variant === "myInvites" ? lightBlue : "white"}
                  styles={"w-16 h-14"}
                />
                <h1
                  className={`m-2 ${
                    variant === "myInvites" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  Invites
                </h1>
              </li>
            </ul>
            <div className="flex flex-col justify-center items-center">
              <DropDownMenuByArrow>
                <h1
                  onClick={() => navigate(`/profile/${username}`)}
                  className="p-4 rounded-lg hover:bg-gray-200 delay-50 duration-75 hover:cursor-pointer"
                >
                  Profile
                </h1>
                <h1
                  onClick={() => logoutRef.current.open()}
                  className="p-4 rounded-lg hover:bg-gray-200 delay-50 duration-75  hover:cursor-pointer"
                >
                  Logout
                </h1>
              </DropDownMenuByArrow>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
