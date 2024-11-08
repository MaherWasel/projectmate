import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/buttons/SubmitButton";
import Divider from "../../../components/divider/Divider";
import TextInput from "../../../components/input/TextInput";

export default function ResetPasswordDialog({ dialogRef }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);

    // If form is valid, close the dialog
    if (isValid && dialogRef?.current) {
      dialogRef.current.close(); // Close the dialog
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 bg-darkGray text-white p-4">
      <p className="text-3xl flex self-start p-2 font-bold">Reset Password</p>
      <Divider color="lightBlue" />

      <TextInput
        label="New Password"
        type="password"
        name="newPassword"
        register={register}
        errors={errors}
        required={true}
        validation={{
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
      />

      <TextInput
        label="Confirm New Password"
        type="password"
        name="confirmPassword"
        register={register}
        errors={errors}
        required={true}
        validation={{
          validate: (value) =>
            value === watch("newPassword") || "Passwords do not match",
        }}
      />

      <span className="mb-4">
        <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Submit
        </Button>
      </span>
    </div>
  );
}
