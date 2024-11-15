import React, { forwardRef, useRef, useState } from "react";
import profileIcon from "../../../assets/icons/ProfileIcon.svg";
import { AttachFile } from "@mui/icons-material";

const Avatar = forwardRef(
  ({ src, onEdit = () => {}, hasAccess, register }, ref) => {
    const [newSrc, setNewSrc] = useState(src);
    const fileInputRef = useRef(null);
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewSrc(reader.result);
          onEdit(file);
        };
        reader.readAsDataURL(file);
      } else {
      }
    };

    const handleDivClick = () => {
      if (hasAccess) fileInputRef.current.click();
    };

    return (
      <div
        className={`relative inline-block ${
          hasAccess ? "cursor-pointer" : undefined
        }`}
        onClick={handleDivClick}
      >
        <img
          src={newSrc ? newSrc : profileIcon}
          alt="Avatar"
          className="w-16 h-16 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full border border-gray-300 object-cover"
          ref={ref}
        />
        <input
          type="file"
          accept="image/*"
          {...(register ? register("image") : null)}
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        {hasAccess && (
          <AttachFile className="text-gray-300 cursor-pointer absolute right-0 bottom-1" />
        )}
      </div>
    );
  }
);

export default Avatar;
