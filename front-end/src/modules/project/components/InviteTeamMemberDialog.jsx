import { Cancel } from "@mui/icons-material";
import Dialog from "../../../components/dialoge/Dialog";
import Divider from "../../../components/divider/Divider";
import TextInput from "../../../components/input/TextArea";
import Button from "../../../components/buttons/SubmitButton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import backendUrl from "../../../helpers/utils";

export default function InviteTeamMemberDialog({ project, dialogRef }) {
  const [inviteState, setInviteState] = useState({
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
    watch,
    reset,
  } = useForm();

  const usernameValue = watch("username", ""); // Watch for username input

  const resetState = () => {
    setInviteState({
      loading: false,
      success: false,
      error: false,
      errorMessage: undefined,
      message: undefined,
    });
    reset();
  };

  const onSubmit = async (data) => {
    setInviteState({
      loading: true,
      success: false,
      error: false,
      errorMessage: undefined,
      message: undefined,
    });

    try {
      const response = await axios.post(
        `${backendUrl}/invites`,
        {
          project: project._id,
          username: data.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setInviteState({
          loading: false,
          success: true,
          error: false,
          message: response.data.message,
          errorMessage: undefined,
        });
      }
    } catch (e) {
      setInviteState({
        loading: false,
        success: false,
        error: true,
        errorMessage: e.response?.data?.message || "Failed to send the invite.",
      });
    }
  };

  return (
    <Dialog ref={dialogRef}>
      <div className="flex bg-darkGray p-4 flex-col gap-4 text-2xl">
        <div className="flex justify-between w-full">
          <h1>Invite Team Member</h1>
          <Cancel
            onClick={() => {
              resetState();
              dialogRef.current.close();
            }}
            className="text-lightBlue hover:cursor-pointer"
          />
        </div>
        <Divider color="lightBlue" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            rows={1}
            name="username"
            placeholder="Enter team member's username"
            register={register}
            errors={errors}
            required
          />
          {inviteState.errorMessage && (
            <p className="text-red-600 my-4">{inviteState.errorMessage}</p>
          )}
          {inviteState.success && (
            <p className="text-green-400 my-4">
              {inviteState.message || "Invitation sent succesfully"}
            </p>
          )}
          <div>
            {!inviteState.success && (
              <Button
                disabled={!usernameValue.trim() || inviteState.loading}
                loading={inviteState.loading}
                type="submit"
              >
                Invite
              </Button>
            )}
          </div>
        </form>
        {inviteState.success && (
          <Button
            onClick={() => {
              resetState();
              dialogRef.current.close();
            }}
          >
            Close
          </Button>
        )}
      </div>
    </Dialog>
  );
}
