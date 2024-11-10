import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BackButton({ ...props }) {
  const [splash, setSplash] = useState({ x: 0, y: 0, isVisible: false });

  const handleMouseDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // Get x position relative to the button
    const y = event.clientY - rect.top; // Get y position relative to the button

    setSplash({ x, y, isVisible: true });

    // Hide the splash effect after a short duration
    setTimeout(() => {
      setSplash((prev) => ({ ...prev, isVisible: false }));
    }, 600);
  };

  return (
    <button
      {...props}
      type="button"
      onMouseDown={handleMouseDown}
      className="relative p-4 md:p-6 rounded-full border-2 border-lightBlue overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
    >
      <ArrowBack className="text-lightBlue" />
      {splash.isVisible && (
        <motion.span
          className="absolute bg-lightBlue rounded-full opacity-60"
          initial={{ scale: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "100px",
            height: "100px",
            left: `${splash.x - 50}px`,
            top: `${splash.y - 50}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </button>
  );
}
