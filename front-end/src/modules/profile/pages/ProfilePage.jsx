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
import { currentUser } from "../../../helpers/currentUser";
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
  const [updatedImg, setUpdatedImg] = useState(null);
  const [updatedBio, setUpdatedBio] = useState("");
  const [links, setLinks] = useState(["x.com", "gmail.com"]);
  const { username } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      // setUserState((old) => ({ ...old, loading: true }));

      try {
        const response = await axios.get(
          `http://localhost:8080/profile/${username}`,
          { withCredentials: true }
        );

        // console.dir(response);
        if (response.status >= 200 && response.status < 300) {
          setUserState({
            loading: false,
            success: true,
            error: false,
            errorMessage: null,
            data: response.data,
          });
          navigate(`/profile/${username}`);
        } else throw new Error(response.statusText);
      } catch (error) {
        // Handle errors (e.g., incorrect username/password, server error, etc.)
        console.error(
          "Error during login:",
          error.response ? error.response.data : error.message
        );
        alert("Login failed. Please try again.");
      }

      //   setUserState({
      //     loading: false,
      //     success: true,
      //     error: false,
      //     errorMessage: null,
      //     data: userData,
      //   });
      //   setUpdatedImg(userData.img);
      //   setUpdatedBio(userData.bio);
      //   setLinks(userData.links);
      // } catch (error) {
      //   setUserState({
      //     loading: false,
      //     success: false,
      //     error: true,
      //     errorMessage: error.message || "Failed to load profile data",
      //     data: null,
      //   });
      // }
    };
    fetchUserData();
  }, []);

  const isOwner = userState.data?.isOwner;
  const handleImageEdit = (newImage) => {
    if (isOwner) {
      setUpdatedImg(newImage);
    }
  };

  // const handleBioChange = (event) => {
  //   if (isOwner) {
  //     setUpdatedBio(event.target.value);
  //   }
  // };

  const onSubmit = async (data) => {
    const { bio, links } = data;
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("links", links);
    formData.append("image", updatedImg);
    try {
      const response = await axios.post(
        `http://localhost:8080/profile/${username}`,
        formData,
        {
          withCredentials: true,
        }
      );
      // console.dir(response);
      if (response.status >= 200 && response.status < 300) {
        navigate(`/profile/${username}`);
      } else throw new Error(response.statusText);
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // const isModified =
  //   updatedImg !== userState.data?.img ||
  //   updatedBio !== userState.data?.bio ||
  //   JSON.stringify(links) !== JSON.stringify(userState.data?.links);

  return (
    <div className="w-full h-screen bg-darkGray relative flex flex-col justify-center items-center overflow-auto">
      <span className="m-4 absolute top-4 left-4">
        <BackButton onClick={() => navigate("/")} />
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
                  defaultValue={userState.data.bio}
                  placeholder="Enter your bio"
                  labelColorProp="text-white"
                  // onChange={handleBioChange}
                  disabled={!isOwner}
                  rowNum={updatedBio.length > 50 ? 6 : null}
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
                    {/* ToDo: add disabled effect */}
                    <Button
                    // disabled={!isModified}
                    >
                      Save
                    </Button>
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
