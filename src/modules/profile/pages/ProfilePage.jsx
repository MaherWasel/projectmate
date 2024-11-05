import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BackButton from "../../../components/buttons/BackButton";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import Avatar from "../components/Avatar";
import TextInput from "../../../components/input/TextInput";
import Textarea from "../../../components/input/TextArea";
import Button from "../../../components/buttons/SubmitButton";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      setUserState((old) => ({ ...old, loading: true }));

      try {
        const userData = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                name: "Ahmed",
                email: "ahmed@gmail.com",
                img: "https://via.placeholder.com/150",
                bio: "Hello, I’m Ahmed. Software engineer with a passion for learning new technologies.",
              }),
            2000
          )
        );

        setUserState({
          loading: false,
          success: true,
          error: false,
          errorMessage: null,
          data: userData,
        });

        // Set initial values
        setUpdatedImg(userData.img);
        setUpdatedBio(userData.bio);
      } catch (error) {
        setUserState({
          loading: false,
          success: false,
          error: true,
          errorMessage: error.message || "Failed to load profile data",
          data: null,
        });
      }
    };

    fetchUserData();
  }, []);

  const handleImageEdit = (newImage) => {
    setUpdatedImg(newImage);
  };

  const handleBioChange = (event) => {
    setUpdatedBio(event.target.value);
  };

  const onSubmit = (data) => {
    console.log("Updated Image:", updatedImg);
    console.log("Updated Bio:", updatedBio);
  };

  const isModified =
    updatedImg !== userState.data?.img || updatedBio !== userState.data?.bio;

  return (
    <div className="w-full h-screen bg-darkGray relative flex flex-col justify-center items-center">
      <span className="m-4 absolute top-4 left-4">
        <BackButton onClick={() => navigate("/")} />
      </span>
      <div className="flex flex-col items-center w-full">
        {userState.loading ? (
          <CircularProgressIndicator />
        ) : userState.success ? (
          <div className="text-center p-4 flex flex-col items-center w-full">
            <Avatar src={updatedImg} onEdit={handleImageEdit} />
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
              <Textarea
                label="Bio"
                name="bio"
                register={register}
                errors={errors}
                defaultValue={updatedBio}
                placeholder="Enter your bio"
                onChange={handleBioChange}
              />
              <div className="w-full h-18">
                <Button disabled={!isModified}>Submit</Button>
              </div>
            </form>
          </div>
        ) : userState.error ? (
          <p className="text-redError flex justify-center items-center">
            {userState.errorMessage || "ERROR"}
          </p>
        ) : null}
      </div>
    </div>
  );
}
