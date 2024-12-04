import { Cancel } from "@mui/icons-material";
import Dialog from "../../../components/dialoge/Dialog";
import Divider from "../../../components/divider/Divider";
import Textarea from "../../../components/input/TextArea";
import Button from "../../../components/buttons/SubmitButton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinProjectDialog({ project, dialogRef }) {
  const navigate = useNavigate();

  const [joiningState, setJoiningState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: undefined,
    message: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to reset state when the dialog opens
  const resetState = () => {
    setJoiningState({
      loading: false,
      success: false,
      error: false,
      errorMessage: undefined,
      message: undefined,
    });

    reset(); // Resets the form including its errors
  };

  useEffect(() => {
    resetState();
  }, []);

  const onSubmit = async (data) => {
    setJoiningState({
      loading: true,
      success: false,
      error: false,
      errorMessage: undefined,
      message: undefined,
    });

    try {
      const response = await axios.post(
        `http://localhost:8080/projects/${project._id}/joinRequests/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setJoiningState({
          loading: false,
          success: true,
          error: false,
          message: response.data.message,
          errorMessage: undefined,
        });
      }
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      } else {
        setJoiningState({
          loading: false,
          success: false,
          error: true,
          errorMessage: e.response?.data?.message,
        });
      }
    }
  };

  return (
    <Dialog ref={dialogRef}>
      <div className="flex bg-darkGray p-4 flex-col gap-4 text-2xl">
        <div className="flex justify-between w-full">
          <h1>Request Message</h1>
          <Cancel
            onClick={() => dialogRef.current.close()}
            className="text-lightBlue hover:cursor-pointer"
          />
        </div>
        <Divider color="lightBlue" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            rows={6}
            name="message"
            register={register}
            errors={errors}
            required
          />
          {joiningState.errorMessage && (
            <p className="text-red-600 my-4">{joiningState.errorMessage}</p>
          )}
          {joiningState.message && (
            <p className="text-green-400 my-4">{joiningState.message}</p>
          )}
          <div>
            {!joiningState.success && (
              <Button
                disabled={errors.message != null || joiningState.loading}
                type="submit"
              >
                Submit
              </Button>
            )}
            {joiningState.success && (
              <Button onClick={() => dialogRef.current.close()}>Close</Button>
            )}
          </div>
        </form>
      </div>
    </Dialog>
  );
}
