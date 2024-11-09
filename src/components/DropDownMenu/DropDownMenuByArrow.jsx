import { ExpandMore } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../assets/icons/ProfileIcon.svg";

export default function DropDownMenuByDownArrow({ children }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref to track the dropdown
  const buttonRef = useRef(null); // Create a ref to track the button

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownStyle = () => {
    if (buttonRef.current) {
      const { right } = buttonRef.current.getBoundingClientRect(); // Removed `width`
      const viewportWidth = window.innerWidth;

      if (right + 200 > viewportWidth) {
        return { left: "auto", right: 0 };
      }
    }
    return { left: 0 };
  };

  // ToDo: get user image from local storage
  // const [userImage, setUserImage] = useState(localStorage.getItem("userImage"));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex items-center"
      >
        <div className="flex flex-col items-center">
          {/*  ToDo: add User image  */}

          <img
            className="w-16 rounded-full h-14"
            src={ProfileIcon}
            alt="profileIcon"
          />
          <ExpandMore style={{ color: "white" }} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute w-48 bg-white shadow-lg rounded-lg z-10"
            style={{
              top: "100%",
              ...dropdownStyle(),
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
