import { useState } from "react";
import Divider from "../divider/Divider";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import CircularProgressIndicator from "../spinner/circulatProgressIndicator";

export default function ProjectCard({ project, variant = "home" }) {
  const [showHoverEffect, setHoverEffect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  async function handleInvites(project, request) {
    if (request === "showInfo") {
      navigate(`/projects/${project._id}`);
      return;
    }
    setLoading(true);
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (request === "accept") {
        navigate(`/projects/${project._id}`);
      }
    } catch (e) {
      setErrorMessage("Failed To Handle Invite");
    } finally {
      setLoading(false);
    }
  }

  function handleShowInfo(project) {
    navigate(`/projects/${project._id}`);
  }

  return (
    <div
      className="w-full sm:max-w-sm xl:max-w-3xl flex flex-col bg-white rounded-xl border-2 border-darkGray transition-all duration-300 ease-in-out shadow-2x text-xl "
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
      onClick={() => setHoverEffect(true)}
    >
      <p className="flex self-center justify-center p-2 text-redError font-bold">
        {errorMessage}
      </p>
      <div className="flex justify-between m-3 items-center">
        <h1 className="font-bold">
          {variant === "invites" ? project.project.title : project.title}
        </h1>
        <div className="rounded-3xl bg-darkGray text-white p-2">
          {variant === "invites" ? project.project.status : project.status}
        </div>
      </div>
      <Divider />
      <div className="my-12 flex justify-center self-center p-2 h-28 items-center overflow-auto">
        {variant === "invites"
          ? project.project.description
          : project.description}
      </div>
      <Divider />

      <div className="relative">
        <div className="flex flex-col m-3">
          <p className="font-bold">Requirements</p>
          <ul className="flex flex-row justify-center">
            {variant === "invites"
              ? project.project.requirements.map((e, index) => (
                  <li key={index} className="m-2">
                    {e}
                  </li>
                ))
              : project.requirements.map((e, index) => (
                  <li key={index} className="m-2">
                    {e}
                  </li>
                ))}
          </ul>
        </div>

        {/* Requirements Section */}
        <Divider />
        <div className="relative">
          <div className="flex flex-col m-3">
            <p className="font-bold">Majors</p>
            <ul className="flex flex-row justify-center">
              {loading ? (
                <CircularProgressIndicator color="secondary" />
              ) : variant === "invites" ? (
                project.project.majors.map((e, index) => (
                  <li key={index} className="m-2">
                    {e}
                  </li>
                ))
              ) : (
                project.majors.map((e, index) => (
                  <li key={index} className="m-2">
                    {e}
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Hover Effect Button on Majors Section */}
          {!loading && (
            <AnimatePresence>
              {showHoverEffect && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center w-full h-full "
                >
                  <div className="w-full h-full z-20 bg-white flex justify-center self-center">
                    <div className="w-full flex flex-row">
                      {variant === "home" ? (
                        <span className="px-4 py-2 w-full">
                          <Button
                            onClick={() => handleShowInfo(project)}
                            className="w-full h-full"
                          >
                            Show Info
                          </Button>
                        </span>
                      ) : (
                        <>
                          <span className="px-4 py-2 w-full h-full">
                            <Button
                              onClick={() => handleInvites(project, "decline")}
                              variant="error"
                              className="w-1/2"
                            >
                              Decline
                            </Button>
                          </span>
                          <span className="px-4 py-2 w-full h-full">
                            <Button
                              onClick={() => handleInvites(project, "accept")}
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
    </div>
  );
}
