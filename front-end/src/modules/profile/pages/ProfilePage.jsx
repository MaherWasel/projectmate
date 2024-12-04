import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "../../../components/buttons/BackButton";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import Avatar from "../components/Avatar";
import TextInput from "../../../components/input/TextInput";
import Textarea from "../../../components/input/TextArea";
import Button from "../../../components/buttons/SubmitButton";
import Links from "../components/Links";
import axios from "axios";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userState, setUserState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: null,
  });
  const [updatingContent, setUpdatingContent] = useState(false);
  const [updatedImg, setUpdatedImg] = useState(null);
  const [updatedBio, setUpdatedBio] = useState("");
  const [links, setLinks] = useState([]);
  const [originalData, setOriginalData] = useState(null); // Track original data
  const { username } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserState((old) => ({ ...old, loading: true }));
        const response = await axios.get(
          `http://localhost:8080/profile/${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status >= 200 && response.status < 300) {
          const userData = response.data.record;
          setUserState({
            loading: false,
            success: true,
            error: false,
            errorMessage: null,
            data: userData,
          });
          setLinks(userData.links);
          setUpdatedBio(userData.bio);
          setUpdatedImg(userData.image.url);
          setOriginalData(userData); // Set original data for comparison
          navigate(`/profile/${username}`);
        } else {
          throw new Error(response.statusText); // Handle unexpected non-401 errors
        }
      } catch (error) {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/login"); // Redirect to login page
          console.error("Unauthorized: Redirecting to login.");
        } else {
          // Log other errors
          console.error(
            "Error during fetching user data:",
            error.response ? error.response.data : error.message
          );
        }
      } finally {
        setUserState((old) => ({ ...old, loading: false }));
      }
    };

    fetchUserData();
  }, [username, navigate]);

  const isOwner = userState.data?.isOwner;

  const handleImageEdit = (newImage) => {
    if (isOwner) {
      setUpdatedImg(newImage);
    }
  };

  const handleBioChange = (event) => {
    if (isOwner) {
      setUpdatedBio(event.target.value);
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("bio", updatedBio);
    formData.append("links", links);
    formData.append("image", updatedImg);

    try {
      setUpdatingContent(true);
      const response = await axios.post(
        `http://localhost:8080/profile/${username}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Update original data on success
        const updatedData = {
          ...originalData,
          bio: updatedBio,
          links: links,
          image: { url: updatedImg },
        };
        setOriginalData(updatedData);
        setUserState((old) => ({ ...old, data: updatedData }));

        navigate(`/profile/${username}`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token"); // Clear the invalid token
        navigate("/login"); // Redirect to login page
        console.error("Unauthorized: Redirecting to login.");
      } else {
        // Log other errors
        console.error(
          "Error during profile update:",
          error.response ? error.response.data : error.message
        );
      }
    } finally {
      setUpdatingContent(false);
    }
  };

  // Check if any of the fields have been modified
  const isModified =
    updatedImg !== originalData?.image?.url ||
    updatedBio !== originalData?.bio ||
    JSON.stringify(links) !== JSON.stringify(originalData?.links);

  return (
    <div className="w-full h-screen bg-darkGray relative flex flex-col justify-center items-center overflow-auto">
      <span className="m-4 absolute top-4 left-4 z-50">
        <BackButton onClick={() => navigate("/home")} />
      </span>

      <AnimatePresence>
        {userState.loading ? (
          <CircularProgressIndicator />
        ) : userState.success ? (
          <motion.div
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center p-4 flex flex-col items-center w-full">
              <Avatar
                register={register}
                src={updatedImg}
                onEdit={handleImageEdit}
                hasAccess={isOwner}
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full sm:w-1/2 mt-4"
              >
                <TextInput
                  label="Email"
                  name="email"
                  register={register}
                  errors={errors}
                  disabled
                  defaultValue={userState.data.email}
                  placeholder="Enter your email"
                />
                <TextInput
                  label="Username"
                  name="username"
                  register={register}
                  errors={errors}
                  disabled
                  defaultValue={userState.data.username}
                  placeholder="Enter your email"
                />
                <Textarea
                  label="Bio"
                  name="bio"
                  register={register}
                  errors={errors}
                  defaultValue={updatedBio}
                  placeholder="Enter your bio"
                  labelColorProp="text-white"
                  onChange={handleBioChange}
                  disabled={!isOwner}
                  rowNum={(updatedBio?.length || 0) > 50 ? 6 : null}
                />
                <Links
                  register={register}
                  errors={errors}
                  links={links}
                  setLinks={setLinks}
                  hasAccess={isOwner}
                />
                {isOwner && (
                  <div className="w-full h-18">
                    {updatingContent ? (
                      <CircularProgressIndicator />
                    ) : (
                      <Button disabled={!isModified}>Save</Button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        ) : userState.error ? (
          <p className="text-redError flex justify-center items-center">
            {userState.errorMessage || "ERROR"}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
