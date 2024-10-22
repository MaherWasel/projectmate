import { useState } from "react";
import Divider from "../divider/Divider";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../buttons/SubmitButton";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Note that variant can be only home or invites!
export default function ProjectCard({ project, variant = "home" }) {
  const [showHoverEffect, setHoverEffect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleInvites(request) {
    if (request === "showInfo") {
      navigate(`/project/${project.id}`);
      return;
    }
    setLoading(true);
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate(`/project/${project.id}`);
    } catch (e) {
      setErrorMessage("Failed To Handle Invite");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="w-full flex flex-col bg-white rounded-xl border-2 border-darkGray transition-all duration-300 ease-in-out shadow-2xl	"
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
    >
      <p className="flex self-center justify-center p-2  text-redError font-bold">
        {errorMessage}
      </p>
      <div className="flex justify-between m-3 items-center">
        <h1 className="font-bold">{project.title}</h1>
        <div className="rounded-3xl bg-darkGray text-white p-2">
          {project.status}
        </div>
      </div>
      <Divider />
      <div className="my-16 flex justify-center self-center p-2">
        {project.description}
      </div>
      <Divider />

      <div className="relative">
        <div className="flex flex-col m-3">
          <p className="font-bold">Requirements</p>
          <ul className="flex flex-row justify-center">
            {loading ? (
              <CircularProgress />
            ) : (
              project.requirements.map((e, index) => (
                <li key={index} className="m-2">
                  {e}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Hover Effect Button */}
        {!loading && (
          <AnimatePresence>
            {showHoverEffect && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center w-full h-full pb-2"
              >
                <div className="w-full h-full z-20 bg-white flex justify-center self-center">
                  <div className="w-full   flex flex-row">
                    {variant === "home" ? (
                      <span className="p-4 w-full">
                        <Button className="w-full h-full">Show Info</Button>
                      </span>
                    ) : (
                      <>
                        <span className="p-4 w-full h-full">
                          <Button
                            onClick={() => handleInvites("decline")}
                            variant="error"
                            className="w-1/2"
                          >
                            Decline
                          </Button>
                        </span>
                        <span className="p-4 w-full h-full">
                          <Button
                            onClick={() => handleInvites("accept")}
                            className="w-full h-full"
                          >
                            Accept
                          </Button>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
