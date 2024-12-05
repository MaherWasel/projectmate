import { ExpandMore } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../assets/icons/ProfileIcon.svg";
import axios from "axios";

export default function DropDownMenuByDownArrow({ children }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(
    "https://res.cloudinary.com/ddjfk5dyz/image/upload/v1731221129/ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx.svg"
  );
  const dropdownRef = useRef(null); // Create a ref to track the dropdown
  const buttonRef = useRef(null); // Create a ref to track the button

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        // Fetch user image when he is logged in, to prevent unnecessary requests
        if (localStorage.getItem("token")) {
          const response = await axios.get(`http://localhost:8080/image`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.status >= 200 && response.status < 300) {
            setSrc(response.data);
          } else throw new Error(response.statusText);
        }
      } catch (error) {
        // Handle errors (e.g., incorrect username/password, server error, etc.)
        console.error(
          "Error during login:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchUserImage();

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

          <img className="w-16 rounded-full h-14" src={src} alt="profileIcon" />
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
