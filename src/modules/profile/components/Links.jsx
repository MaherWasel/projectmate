import { Cancel, CheckCircleOutline, Link } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import TextInput from "../../../components/input/TextInput";
import Dialog from "../../../components/dialoge/Dialog";
import ResetPasswordDialog from "./ResetPasswordDialoge";

export default function Links({ links, setLinks, hasAccess }) {
  const [currentLinks, setCurrentLinks] = useState(links);
  const [copyStatus, setCopyStatus] = useState(null);
  const dialogRef = useRef();

  const addLink = () => {
    if (hasAccess) setCurrentLinks([...currentLinks, ""]);
  };

  const removeLink = (index) => {
    if (hasAccess) {
      const updatedLinks = currentLinks.filter((_, i) => i !== index);
      setCurrentLinks(updatedLinks);
      setLinks(updatedLinks);
    }
  };

  const handleLinkChange = (index, value) => {
    if (hasAccess) {
      const updatedLinks = [...currentLinks];
      updatedLinks[index] = value;
      setCurrentLinks(updatedLinks);
      setLinks(updatedLinks);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(index);
      setTimeout(() => setCopyStatus(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Dialog ref={dialogRef}>
        <ResetPasswordDialog dialogRef={dialogRef} />
      </Dialog>
      {currentLinks.map((link, index) => (
        <div key={index} className="flex items-center w-full">
          <TextInput
            value={link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
            placeholder="Enter your link"
            disabled={!hasAccess}
            suffixIcon={
              hasAccess ? (
                <span
                  className="cursor-pointer"
                  onClick={() => removeLink(index)}
                >
                  <Cancel className="text-lightBlue" />
                </span>
              ) : (
                <motion.span
                  onClick={() => handleCopy(link, index)}
                  className="cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {copyStatus === index ? (
                    <CheckCircleOutline className="text-green-500" />
                  ) : (
                    <Link className="text-lightBlue" />
                  )}
                </motion.span>
              )
            }
          />
        </div>
      ))}
      <div className="flex justify-center gap-12 text-xl m-4 font-semibold">
        {hasAccess && (
          <>
            <button onClick={addLink} className="text-lightBlue">
              Add Links
            </button>
            <button
              onClick={() => dialogRef.current.open()} // Open the dialog
              className="text-lightBlue"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
